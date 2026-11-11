/**
 * Right-hand "On this page" list with an animated track, modelled on
 * Tonder's docs (Fumadocs "clerk" style):
 *
 *  - one thin grey line runs down the left of the list and steps in, with a
 *    soft S-curve, for each sub-heading level
 *  - the same line is drawn again in the brand colour and clipped to the
 *    sections currently on screen; the clip slides as the reader scrolls
 *  - a small dot travels along the curve: it leads at the bottom of the
 *    highlighted stretch while scrolling down, and at the top while scrolling up
 *  - something is always highlighted, including at the very top of the page
 */
import React, {useEffect, useRef} from 'react';
import TOC from '@theme-original/TOC';

const SVG_NS = 'http://www.w3.org/2000/svg';
const LINE_X = 8.5; // x of the line for top-level headings
const LINE_STEP = 8; // the line moves this far right per heading level
const TEXT_X = 20; // text indent for top-level headings
const TEXT_STEP = 12; // extra text indent per heading level
const CURVE = 12; // height of the S-curve, drawn at the top of the item it leads into

// Each step to a new level is an S-curve that sits entirely at the TOP of the
// item it leads into (as on Tonder). The highlight is clipped at item edges,
// so it never cuts a curve in half.
function buildPath(geo) {
  let d = '';
  geo.forEach((g, i) => {
    const prev = geo[i - 1];
    if (i === 0) {
      d += `M${g.x} ${g.top}`;
    } else if (prev.x !== g.x) {
      const y0 = g.top;
      const y1 = g.top + CURVE;
      d += ` L${prev.x} ${y0} C${prev.x} ${y0 + CURVE * 0.75} ${g.x} ${y0 + CURVE * 0.25} ${g.x} ${y1}`;
    }
    d += ` L${g.x} ${g.bottom}`;
  });
  return d;
}

function setUpTrack(root) {
  const list = root.querySelector('.table-of-contents');
  if (!list) return undefined;
  const links = [...list.querySelectorAll('a.table-of-contents__link')];
  if (links.length === 0) return undefined;

  const items = links.map((a) => {
    let depth = 0;
    for (let e = a.parentElement; e && e !== list; e = e.parentElement) {
      if (e.tagName === 'UL') depth += 1;
    }
    a.style.paddingInlineStart = `${TEXT_X + depth * TEXT_STEP}px`;
    let id = a.hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      /* keep the raw id */
    }
    return {a, depth, heading: document.getElementById(id)};
  });

  // Grey track + coloured copy (clipped) + dot
  const layer = document.createElement('div');
  layer.className = 'toc-track';
  layer.setAttribute('aria-hidden', 'true');
  const makeSvg = (cls) => {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', cls);
    const path = document.createElementNS(SVG_NS, 'path');
    svg.appendChild(path);
    layer.appendChild(svg);
    return {svg, path};
  };
  const base = makeSvg('toc-track__base');
  const active = makeSvg('toc-track__active');
  const dot = document.createElement('div');
  dot.className = 'toc-track__dot';
  layer.appendChild(dot);
  list.classList.add('toc-animated');
  list.prepend(layer);

  let geo = [];
  let pathLength = 0;
  let lengthAtY = () => 0;

  const layout = () => {
    const box = list.getBoundingClientRect();
    geo = items.map(({a, depth}) => {
      const r = a.getBoundingClientRect();
      return {top: r.top - box.top, bottom: r.bottom - box.top, x: LINE_X + depth * LINE_STEP};
    });
    const height = list.scrollHeight;
    const width = Math.max(...geo.map((g) => g.x)) + LINE_X;
    const d = buildPath(geo);
    layer.style.width = `${width}px`;
    layer.style.height = `${height}px`;
    [base, active].forEach(({svg, path}) => {
      svg.setAttribute('width', width);
      svg.setAttribute('height', height);
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      path.setAttribute('d', d);
    });
    dot.style.offsetPath = `path("${d}")`;

    // Lookup: how far along the path we are at a given y (for the dot)
    pathLength = active.path.getTotalLength();
    const samples = [];
    for (let l = 0; l <= pathLength; l += 1) samples.push(active.path.getPointAtLength(l).y);
    lengthAtY = (y) => {
      let lo = 0;
      let hi = samples.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (samples[mid] < y) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    };
  };

  let lastScrollY = window.scrollY;
  let direction = 'down';

  const update = () => {
    const navbar = document.querySelector('.navbar');
    const viewTop = navbar ? navbar.getBoundingClientRect().bottom : 0;
    const viewBottom = window.innerHeight;
    const article = document.querySelector('.theme-doc-markdown');
    const end = article ? article.getBoundingClientRect().bottom : Infinity;
    const tops = items.map(({heading}) => (heading ? heading.getBoundingClientRect().top : null));

    // A section runs from its heading to the next heading; it's active while any of it is on screen
    const isActive = tops.map((top, i) => {
      if (top === null) return false;
      let next = end;
      for (let j = i + 1; j < tops.length; j += 1) {
        if (tops[j] !== null) {
          next = tops[j];
          break;
        }
      }
      return top < viewBottom - 1 && next > viewTop + 1;
    });
    // Above the first heading (page intro), highlight the first item, like Tonder
    if (!isActive.includes(true)) isActive[0] = true;

    items.forEach(({a}, i) => a.toggleAttribute('data-active', isActive[i]));
    const first = isActive.indexOf(true);
    const last = isActive.lastIndexOf(true);
    const top = geo[first].top;
    const bottom = geo[last].bottom;
    layer.style.setProperty('--track-top', `${top}px`);
    layer.style.setProperty('--track-bottom', `${bottom}px`);
    // The dot leads in the direction of travel
    const dotY = direction === 'down' ? bottom : top;
    dot.style.offsetDistance = `${lengthAtY(dotY)}px`;
  };

  let frame = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (y !== lastScrollY) direction = y > lastScrollY ? 'down' : 'up';
    lastScrollY = y;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      update();
    });
  };
  const onResize = () => {
    layout();
    update();
  };

  direction = 'up'; // on load the dot sits at the top of the highlight
  layout();
  update();
  // Enable the sliding only after the first position is set (no slide-in on load)
  requestAnimationFrame(() => layer.classList.add('toc-track--ready'));

  window.addEventListener('scroll', onScroll, {passive: true});
  window.addEventListener('resize', onResize);
  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
  observer?.observe(list);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    observer?.disconnect();
    layer.remove();
    list.classList.remove('toc-animated');
    items.forEach(({a}) => {
      a.removeAttribute('data-active');
      a.style.paddingInlineStart = '';
    });
  };
}

export default function TOCWrapper(props) {
  const ref = useRef(null);
  useEffect(() => (ref.current ? setUpTrack(ref.current) : undefined), [props.toc]);

  return (
    <div ref={ref} className="toc-wrapper">
      <h3 className="toc-title">
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M21 5H3M15 12H3M17 19H3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        On this page
      </h3>
      <div className="toc-scroll">
        <TOC {...props} />
      </div>
    </div>
  );
}
