# Image rename plan: whole project

Status: **Ready to run with `rename-all-images.sh`. Nothing has been renamed yet.**
Date: 2026-10-29 · Branch: `dcu-update-check`

## Convention
`PascalCaseName-Light.ext` / `PascalCaseName-Dark.ext`, the same as Module 5 and DCU Setup > Maintenance.
- Hyphens, underscores, spaces and brackets are removed and each word is capitalized. Acronyms stay as they are (DCU, RCM, URE, CMAS, USB, ID).
- Extensions are lowercased (`.PNG` → `.png`). The double extension `.png.png` becomes `.png`. File formats are unchanged.
- Leftover `Figure N` prefixes are removed. A trailing `-1` is dropped when there's no `-2`.
- Spelling fixes in file names: `Dailogbox` → `DialogBox`, `Blacklight` → `Backlight`, `Inprogress` → `InProgress`, `Pop-up` → `Popup`.
- An image with a dark version but no theme in its name gets `-Light` (for example `DCUSetupSubmenu.png`). Theme-less screenshots were classified by brightness.

## Summary
| | Count |
| :--- | --: |
| Images renamed | 335 |
| Already correct (unchanged) | 31 |
| Pages/files with updated paths | 60 |
| Image paths updated | 254 |
| `srcDark` added (figure has a dark image) | 75 |
| Figures left light-only (no dark image exists) | 157 |
| Name collisions | 0 |

## Folder changes
| Old | New | Why |
| :--- | :--- | :--- |
| `img/0-Intro/hardware` | `img/0-Intro/Hardware` | PascalCase like every other folder |
| `img/0-Intro/status` | `img/0-Intro/Status` | PascalCase |
| `img/4-DCUSetup/2-Diagnostics/5-ScreenShots` | merged into `5-Screenshots` | git tracked both spellings as separate folders; now matches the page `5-Screenshots.mdx` |
| `img/4-DCUSetup/2-Diagnostics/3-VoltageTest` | `3-VoltageTests` | matches the page `3-VoltageTests.mdx` |

## Broken references this fixes
| Page | Was | Now points to |
| :--- | :--- | :--- |
| `docs/1-Routes/1-SelectRoute.mdx:138` | `/img/1-Routes/1-SelectRoute/Measurement-Points-Light.jpg` | `/img/1-Routes/1-SelectRoute/MeasurementPointsScreen-Light.jpg` |
| `docs/1-Routes/1-SelectRoute.mdx:595` | `/img/1-Routes/1-SelectRoute/Adjust-Blacklight-Light.png` | `/img/1-Routes/1-SelectRoute/AdjustBacklight-Light.jpg` |
| `docs/Appendix/B-Troubleshooting/4-DCUSetupTroubleshooting.mdx:82` | `../../img/Appendix/B-Troubleshooting/4-DCUSetup/Tachometer-Test-No-Signal-Condition-Light.png` | `/img/Appendix/B-Troubleshooting/4-DCUSetup/TachometerTestNoSignalCondition-Light.png` |
| `docs/3-SpecialTests/5-TimeSynchronousAveraging.mdx:67` | `/img/3-SpecialTests/5-TimeSynchronousAveraging/update-routes-screen-Light.jpg` (wrong capitalization) | renamed file |
| `docs/4-DCUSetup/2-Diagnostics/index.mdx:23` | `/img/4-DCUSetup/2-Diagnostics/DCUSetup-Diagnostics-Submenu-Light.png` (wrong capitalization) | renamed file |
| `docs/4-DCUSetup/4-AdvanceSettings/9-TestMicroPrograms.mdx:69` | `/img/4-DCUSetup/4-AdvanceSettings/9-TestMicroPrograms/Test-Micro-Warning-Dialogbox-Light.jpg` (wrong capitalization) | renamed file |
| `docs/Appendix/B-Troubleshooting/4-DCUSetupTroubleshooting.mdx:53` | `…Touchscreen-Test-Warning-Dialog-Box-Light.png.png` | `…/TouchscreenTestWarningDialogBox-Light.png` |

## Needs your decision (left unchanged)
- `docs/1-Routes/1-SelectRoute.mdx:99` points to `Measure-Data-More-Screen-Light.jpg`, which doesn't exist. The closest file, `Figure 4-Measurement-Data- (More screen).jpg` (to be renamed `MeasurementDataMoreScreen-Light.jpg`), actually shows the **Transmit Measurements** screen. `More-Screen-Light.jpg` is already used at line 247. Tell me which screenshot it should be.
- `n.PNG` is unused. It shows the Measurement Tests screen with a triax sensor, and will be named `MeasurementTestsScreenTriaxSensor-Light.png`. It may be a duplicate you can delete.
- `Figure 6-Measurement-Points.jpg` is byte-for-byte identical to `Measurement-Points-Screen-Light.jpg`, so it will become `MeasurementPoints-Light.jpg` and is probably safe to delete.
- Not touched: `logo.png` and `favicon.ico` (named in the site config), and the Docusaurus template leftovers `docusaurus-social-card.jpg` and `undraw_*.svg`, which `docusaurus.config.js` and the unused `HomepageFeatures` component point to but which don't exist.

## Full mapping (paths under `static/img/`)

### 0-Intro
| Old | New |
| :--- | :--- |
| `DCU-Application-Screen-Layout-Dark.jpg` | `DCUApplicationScreenLayout-Dark.jpg` |
| `DCU-Application-Screen-Layout-Light.png` | `DCUApplicationScreenLayout-Light.png` |
| `DCU-Dashboard-Dark.PNG` | `DCUDashboard-Dark.png` |
| `DCU-Dashboard-Light.jpg` | `DCUDashboard-Light.jpg` |
| `DCU-Initialization-Screen-Dark.PNG` | `DCUInitializationScreen-Dark.png` |
| `DCU-Initialization-Screen-Light.jpg` | `DCUInitializationScreen-Light.jpg` |

### 0-Intro/hardware
| Old | New |
| :--- | :--- |
| `Battery-Charger-Dock.png` | `0-Intro/Hardware/BatteryChargerDock.png` |
| `Battery-Cover.png` | `0-Intro/Hardware/BatteryCover.png` |
| `Battery-Pack.png` | `0-Intro/Hardware/BatteryPack.png` |
| `DCU-715-Back-View.png` | `0-Intro/Hardware/DCU715BackView.png` |
| `DCU-715-Front-View.png` | `0-Intro/Hardware/DCU715FrontView.png` |
| `DCU-Keypad-Layout.png` | `0-Intro/Hardware/DCUKeypadLayout.png` |
| `Headset.png` | `0-Intro/Hardware/Headset.png` |
| `Power-Switch-USB Panel-Cover.png` | `0-Intro/Hardware/PowerSwitchUSBPanelCover.png` |
| `Sensor-Connection-Cable.png` | `0-Intro/Hardware/SensorConnectionCable.png` |
| `Triaxial-Accelerometer-Sensor.png` | `0-Intro/Hardware/TriaxialAccelerometerSensor.png` |

### 0-Intro/status
| Old | New |
| :--- | :--- |
| `Voltage-TestsIn-Progress-Dark.png` | `0-Intro/Status/VoltageTestsInProgress-Dark.png` |
| `connectionError.png` | `0-Intro/Status/ConnectionError.png` |
| `correctMeasurement.png` | `0-Intro/Status/CorrectMeasurement.png` |
| `error.png` | `0-Intro/Status/Error.png` |
| `measurement.png` | `0-Intro/Status/Measurement.png` |
| `measurement1.png` | `0-Intro/Status/Measurement1.png` |
| `measurementNR3.png` | `0-Intro/Status/MeasurementNR3.png` |
| `processing.png` | `0-Intro/Status/Processing.png` |
| `ready.png` | `0-Intro/Status/Ready.png` |
| `stopRequest.png` | `0-Intro/Status/StopRequest.png` |
| `storeCompleted.png` | `0-Intro/Status/StoreCompleted.png` |
| `updateProcess.png` | `0-Intro/Status/UpdateProcess.png` |
| `waiting1.png` | `0-Intro/Status/Waiting1.png` |
| `waitingForTach.png` | `0-Intro/Status/WaitingForTach.png` |

### 1-Routes
| Old | New |
| :--- | :--- |
| `DCU-Routes-Sub-Menu-Dark.jpg` | `DCURoutesSubMenu-Dark.jpg` |
| `DCU-Routes-Sub-Menu-Light.jpg` | `DCURoutesSubMenu-Light.jpg` |

### 1-Routes/1-SelectRoute
| Old | New |
| :--- | :--- |
| `Add-Numeric-Pin-Pad-Light.jpg` | `AddNumericPinPad-Light.jpg` |
| `Add-Point-(Spectrum-Screen)-Light.jpg` | `AddPointSpectrumScreen-Light.jpg` |
| `Add-Point-(Time-Domain-Screen)-Light.jpg` | `AddPointTimeDomainScreen-Light.jpg` |
| `Add-Warning-Message-for-Configuration-Light.jpg` | `AddWarningMessageForConfiguration-Light.jpg` |
| `Add-point-Waterfall-Measurement-Screen-error-message-Light.jpg` | `AddPointWaterfallMeasurementScreenErrorMessage-Light.jpg` |
| `Adjust-Blacklight-Light.jpg` | `AdjustBacklight-Light.jpg` |
| `Clean-Screen-Light.jpg` | `CleanScreen-Light.jpg` |
| `Confirmation-Dialog-box-for-Update-points-Light.jpg` | `ConfirmationDialogBoxForUpdatePoints-Light.jpg` |
| `Display-Measurement-Screen-Light.jpg` | `DisplayMeasurementScreen-Light.jpg` |
| `Enter-ID-Light.jpg` | `EnterID-Light.jpg` |
| `Enter-ID-Warning-Message-Light.jpg` | `EnterIDWarningMessage-Light.jpg` |
| `Enter-Speed-Confirmation-Pop-up-Light.jpg` | `EnterSpeedConfirmationPopup-Light.jpg` |
| `Enter-Speed-and-Load-Screen-Light.jpg` | `EnterSpeedAndLoadScreen-Light.jpg` |
| `Enter-Temp-Screen-Light.jpg` | `EnterTempScreen-Light.jpg` |
| `Figure 26-Display- Measurement.jpg` | `DisplayMeasurement-Light.jpg` |
| `Figure 4-Measurement-Data- (More screen).jpg` | `MeasurementDataMoreScreen-Light.jpg` |
| `Figure 6-Measurement-Points.jpg` | `MeasurementPoints-Light.jpg` |
| `Figure 7-Measurement-in- process.jpg` | `MeasurementInProcess-Dark.jpg` |
| `Frequency-Change-Warning-Dialogbox-Light.jpg` | `FrequencyChangeWarningDialogBox-Light.jpg` |
| `List-of-Area-Light.jpg` | `ListOfArea-Light.jpg` |
| `List-of-Machine-in-Area-Light.jpg` | `ListOfMachineInArea-Light.jpg` |
| `Measurement-Data-Connection-Screen-Light.jpg` | `MeasurementDataConnectionScreen-Light.jpg` |
| `Measurement-Data-Screen-Light.jpg` | `MeasurementDataScreen-Light.jpg` |
| `Measurement-Points-Screen-Light.jpg` | `MeasurementPointsScreen-Light.jpg` |
| `Measurement-Screen-(for-measure-machine-in-area)-Light.jpg` | `MeasurementScreenForMeasureMachineInArea-Light.jpg` |
| `More-Screen-Light.jpg` | `MoreScreen-Light.jpg` |
| `Not-Measured-Code-Screen-Light.jpg` | `NotMeasuredCodeScreen-Light.jpg` |
| `Not-Measured-Confirmation-Popup-Light.jpg` | `NotMeasuredConfirmationPopup-Light.jpg` |
| `Option-Screen-Light.jpg` | `OptionScreen-Light.jpg` |
| `Plot-Screen-Light.jpg` | `PlotScreen-Light.jpg` |
| `RCM-Results-Light.jpg` | `RCMResults-Light.jpg` |
| `Routes-Measurement-Inprogress-Light.jpg` | `RoutesMeasurementInProgress-Light.jpg` |
| `Select-Routes-Measurement-Route-Screen-Light.jpg` | `SelectRoutesMeasurementRouteScreen-Light.jpg` |
| `Sensor-Type-Screen-Light.jpg` | `SensorTypeScreen-Light.jpg` |
| `Stop-Measurement-In-process-Screen-Light.jpg` | `StopMeasurementInProcessScreen-Light.jpg` |
| `Trouble-Codes-Memo-Screen-Light.jpg` | `TroubleCodesMemoScreen-Light.jpg` |
| `Trouble-Codes-Screen-Light.jpg` | `TroubleCodesScreen-Light.jpg` |
| `Turn-Off-Screen-Light.jpg` | `TurnOffScreen-Light.jpg` |
| `Warning-Dailogbox-Light.jpg` | `WarningDialogBox-Light.jpg` |

### 1-Routes/2-UpdateRoutes
| Old | New |
| :--- | :--- |
| `Configuration-Connection-Route-Update-Screen-Light.jpg` | `ConfigurationConnectionRouteUpdateScreen-Light.jpg` |
| `Update-Route-Route-List-Screen-Light.jpg` | `UpdateRouteRouteListScreen-Light.jpg` |

### 1-Routes/3-DeleteRoutes
| Old | New |
| :--- | :--- |
| `Confirmation-Dialog-Box-Light.jpg` | `ConfirmationDialogBox-Light.jpg` |
| `Error-Message-Dialog-Box-Light.jpg` | `ErrorMessageDialogBox-Light.jpg` |
| `Route-List-for-Delete-Route-Light.jpg` | `RouteListForDeleteRoute-Light.jpg` |

### 1-Routes/4-CreateNewRoute
| Old | New |
| :--- | :--- |
| `Confirmation-Dialog-Box-Light.jpg` | `ConfirmationDialogBox-Light.jpg` |
| `Create-New-Route-Pin-Pad-Light.jpg` | `CreateNewRoutePinPad-Light.jpg` |

### 1-Routes/5-AddNewPoint
| Old | New |
| :--- | :--- |
| `Add-New-Point-Add-Configure-Sensor-Type-Light.jpg` | `AddNewPointAddConfigureSensorType-Light.jpg` |
| `Add-New-Points-Route-list-Light.jpg` | `AddNewPointsRouteList-Light.jpg` |
| `Add-New-Points-Screen-Light.jpg` | `AddNewPointsScreen-Light.jpg` |
| `Add-New-Points-Warning-Dialogbox-Light.jpg` | `AddNewPointsWarningDialogBox-Light.jpg` |

### 2-Measurements
| Old | New |
| :--- | :--- |
| `Measurements-Submenu-Light.jpg` | `MeasurementsSubmenu-Light.jpg` |

### 2-Measurements/1-TransmitMeasurements
| Old | New |
| :--- | :--- |
| `Transmit-Data-Options-Screen-Light.jpg` | `TransmitDataOptionsScreen-Light.jpg` |
| `Transmit-Measurements-Error-Dialog-Light.jpg` | `TransmitMeasurementsErrorDialog-Light.jpg` |
| `Transmit-Measurements-Screen-Light.jpg` | `TransmitMeasurementsScreen-Light.jpg` |
| `Transmit-Measurements-Screen-More-Expanded-Light.jpg` | `TransmitMeasurementsScreenMoreExpanded-Light.jpg` |

### 2-Measurements/2-DisplayMeasurements
| Old | New |
| :--- | :--- |
| `Areas-In-Route-Screen-Light.jpg` | `AreasInRouteScreen-Light.jpg` |
| `Comparison-of-Measurements-Dialog-Light.jpg` | `ComparisonOfMeasurementsDialog-Light.jpg` |
| `Display-Measurement-Screen-Comparison-Measurement-Light.jpg` | `DisplayMeasurementScreenComparisonMeasurement-Light.jpg` |
| `Display-Measurements-Screen-Light.jpg` | `DisplayMeasurementsScreen-Light.jpg` |
| `Display-Measurements-Screen-More-Expanded-Light.jpg` | `DisplayMeasurementsScreenMoreExpanded-Light.jpg` |
| `Display-Measurements-Select-Route-Screen-Light.jpg` | `DisplayMeasurementsSelectRouteScreen-Light.jpg` |
| `Machines-in-Area-Screen-Light.jpg` | `MachinesInAreaScreen-Light.jpg` |
| `Measure-Point-Screen-Light.jpg` | `MeasurePointScreen-Light.jpg` |

### 2-Measurements/3-NotMeasuredMachinesReport
| Old | New |
| :--- | :--- |
| `Machines-Not-Measured-Screen-Light.jpg` | `MachinesNotMeasuredScreen-Light.jpg` |
| `Machines-Not-Measured-Select-Route-Screen-Light.jpg` | `MachinesNotMeasuredSelectRouteScreen-Light.jpg` |
| `USB-Stick-not-found-Dialog-Light.jpg` | `USBStickNotFoundDialog-Light.jpg` |

### 2-Measurements/4-CustomerSignature
| Old | New |
| :--- | :--- |
| `Add-New-Recipients-Screen-Light.jpg` | `AddNewRecipientsScreen-Light.jpg` |
| `Add-New-Recipients-Screen1-Light.jpg` | `AddNewRecipientsScreen1-Light.jpg` |
| `Browse-Emails-Screen-Light.jpg` | `BrowseEmailsScreen-Light.jpg` |
| `Customer-Signature-Screen-Light.jpg` | `CustomerSignatureScreen-Light.jpg` |
| `Customer-Signature-Screen-Sending-Report-Light.jpg` | `CustomerSignatureScreenSendingReport-Light.jpg` |
| `Customer-Signature-Select-Route-Screen-Light.jpg` | `CustomerSignatureSelectRouteScreen-Light.jpg` |
| `Not-Measured-Machine-Confirmation-Dialogbox-Light.jpg` | `NotMeasuredMachineConfirmationDialogBox-Light.jpg` |
| `Recipients-must-be-Selected-Dialog-Light.jpg` | `RecipientsMustBeSelectedDialog-Light.jpg` |
| `Select-Recipients-Screen-Light.jpg` | `SelectRecipientsScreen-Light.jpg` |

### 2-Measurements/5-DeleteMeasurementData
| Old | New |
| :--- | :--- |
| `Delete-Measurements-Confirmation-Dialog-Light.jpg` | `DeleteMeasurementsConfirmationDialog-Light.jpg` |
| `Delete-Measurements-Screen-Light.jpg` | `DeleteMeasurementsScreen-Light.jpg` |
| `Select-Routes-to-Delete-Measurements-Dialog-Light.jpg` | `SelectRoutesToDeleteMeasurementsDialog-Light.jpg` |

### 2-Measurements/6-DisplayTroubleCode
| Old | New |
| :--- | :--- |
| `Delete-Trouble-Code-Confirmation-Dialog-Light.jpg` | `DeleteTroubleCodeConfirmationDialog-Light.jpg` |
| `Display-Trouble-Code-Route-Selection-Screen-Light.jpg` | `DisplayTroubleCodeRouteSelectionScreen-Light.jpg` |
| `Display-Trouble-Code-Screen-Light.jpg` | `DisplayTroubleCodeScreen-Light.jpg` |

### 3-SpecialTests
| Old | New |
| :--- | :--- |
| `Special-Tests-Submenu-Dark.jpg` | `SpecialTestsSubmenu-Dark.jpg` |
| `Special-Tests-Submenu-Light.jpg` | `SpecialTestsSubmenu-Light.jpg` |

### 3-SpecialTests/1-BumpTest
| Old | New |
| :--- | :--- |
| `Bump-Test-Measurement-screen-Dark.jpg` | `BumpTestMeasurementScreen-Dark.jpg` |
| `Bump-Test-Measurement-screen-Light.jpg` | `BumpTestMeasurementScreen-Light.jpg` |
| `Bump-Test-Options-screen-Dark.jpg` | `BumpTestOptionsScreen-Dark.jpg` |
| `Bump-Test-Options-screen-Light.jpg` | `BumpTestOptionsScreen-Light.jpg` |
| `Bump-Test-Select-Route-Screen-Dark.jpg` | `BumpTestSelectRouteScreen-Dark.jpg` |
| `Bump-Test-Select-Route-Screen-Light.jpg` | `BumpTestSelectRouteScreen-Light.jpg` |
| `Connection-Options-screen-Light.jpg` | `ConnectionOptionsScreen-Light.jpg` |
| `Route-Age-Warning-Dialog-Dark.jpg` | `RouteAgeWarningDialog-Dark.jpg` |
| `Route-Age-Warning-Dialog-Light.jpg` | `RouteAgeWarningDialog-Light.jpg` |
| `Sensor-Selection-modal-Dark.jpg` | `SensorSelectionModal-Dark.jpg` |
| `Sensor-Selection-modal-Light.jpg` | `SensorSelectionModal-Light.jpg` |
| `Update-Routes-Screen-Light.jpg` | `UpdateRoutesScreen-Light.jpg` |

### 3-SpecialTests/2-CoastDownTest
| Old | New |
| :--- | :--- |
| `Coast-Down-Test-Measurement-Chart-Light.jpg` | `CoastDownTestMeasurementChart-Light.jpg` |
| `Coast-Down-Test-Measurement-Screen-Dark.jpg` | `CoastDownTestMeasurementScreen-Dark.jpg` |
| `Coast-Down-Test-Measurement-Screen-Light.jpg` | `CoastDownTestMeasurementScreen-Light.jpg` |
| `Coast-Down-Test-Measurement-Screen-More-Options-Expanded-Dark.jpg` | `CoastDownTestMeasurementScreenMoreOptionsExpanded-Dark.jpg` |
| `Coast-Down-Test-Measurement-Screen-More-Options-Expanded-Light.jpg` | `CoastDownTestMeasurementScreenMoreOptionsExpanded-Light.jpg` |
| `Coast-Down-Test-Options-Screen-Dark.jpg` | `CoastDownTestOptionsScreen-Dark.jpg` |
| `Coast-Down-Test-Options-Screen-Light.jpg` | `CoastDownTestOptionsScreen-Light.jpg` |
| `Coast-Down-Test-Select-Route-Screen-Dark.jpg` | `CoastDownTestSelectRouteScreen-Dark.jpg` |
| `Coast-Down-Test-Select-Route-Screen-Light.jpg` | `CoastDownTestSelectRouteScreen-Light.jpg` |
| `Connection-Options-Screen-Light.jpg` | `ConnectionOptionsScreen-Light.jpg` |
| `Route-Age-Warning-Dialog-Dark.jpg` | `RouteAgeWarningDialog-Dark.jpg` |
| `Route-Age-Warning-Dialog-Light.jpg` | `RouteAgeWarningDialog-Light.jpg` |
| `Sensor-Selection-Modal-Dark.jpg` | `SensorSelectionModal-Dark.jpg` |
| `Sensor-Selection-Modal-Light.jpg` | `SensorSelectionModal-Light.jpg` |
| `Setup-Modal-Dark.jpg` | `SetupModal-Dark.jpg` |
| `Setup-Modal-Light.jpg` | `SetupModal-Light.jpg` |
| `Tachometer-Test-Modal-Dark.jpg` | `TachometerTestModal-Dark.jpg` |
| `Tachometer-Test-Modal-Light.jpg` | `TachometerTestModal-Light.jpg` |
| `Update-Routes-Screen-Light.jpg` | `UpdateRoutesScreen-Light.jpg` |

### 3-SpecialTests/3-ExtendedTimeDomain
| Old | New |
| :--- | :--- |
| `Connection-Options-Screen-Light.jpg` | `ConnectionOptionsScreen-Light.jpg` |
| `Extended-Time-Domain-Measurement-More-Options-Expanded-Dark.jpg` | `ExtendedTimeDomainMeasurementMoreOptionsExpanded-Dark.jpg` |
| `Extended-Time-Domain-Measurement-More-Options-Expanded-Light.jpg` | `ExtendedTimeDomainMeasurementMoreOptionsExpanded-Light.jpg` |
| `Extended-Time-Domain-Measurement-Screen-Dark.jpg` | `ExtendedTimeDomainMeasurementScreen-Dark.jpg` |
| `Extended-Time-Domain-Measurement-Screen-Light.jpg` | `ExtendedTimeDomainMeasurementScreen-Light.jpg` |
| `Extended-Time-Domain-Options-Screen-Dark.jpg` | `ExtendedTimeDomainOptionsScreen-Dark.jpg` |
| `Extended-Time-Domain-Options-Screen-Light.jpg` | `ExtendedTimeDomainOptionsScreen-Light.jpg` |
| `Extended-Time-Domain-Select-Route-Screen-Dark.jpg` | `ExtendedTimeDomainSelectRouteScreen-Dark.jpg` |
| `Extended-Time-Domain-Select-Route-Screen-Light.jpg` | `ExtendedTimeDomainSelectRouteScreen-Light.jpg` |
| `Route-Age-Warning-Dialog-Dark.jpg` | `RouteAgeWarningDialog-Dark.jpg` |
| `Route-Age-Warning-Dialog-Light.jpg` | `RouteAgeWarningDialog-Light.jpg` |
| `Sensor-Selection-Modal-Dark.jpg` | `SensorSelectionModal-Dark.jpg` |
| `Sensor-Selection-Modal-Light.jpg` | `SensorSelectionModal-Light.jpg` |
| `Store-Measurement-Data-Dark.jpg` | `StoreMeasurementData-Dark.jpg` |
| `Store-Measurement-Data-Light.jpg` | `StoreMeasurementData-Light.jpg` |
| `Time-Seconds-Numeric-Keypad-Dark.jpg` | `TimeSecondsNumericKeypad-Dark.jpg` |
| `Time-Seconds-Numeric-Keypad-Light.jpg` | `TimeSecondsNumericKeypad-Light.jpg` |
| `Update-Routes-Screen-Light.jpg` | `UpdateRoutesScreen-Light.jpg` |

### 3-SpecialTests/4-OrbitPlot
| Old | New |
| :--- | :--- |
| `Connection-Options-Screen-Light.jpg` | `ConnectionOptionsScreen-Light.jpg` |
| `Orbit-Plot-Measurement-Screen-Dark.jpg` | `OrbitPlotMeasurementScreen-Dark.jpg` |
| `Orbit-Plot-Measurement-Screen-Light.jpg` | `OrbitPlotMeasurementScreen-Light.jpg` |
| `Orbit-Plot-Options-Screen-Dark.jpg` | `OrbitPlotOptionsScreen-Dark.jpg` |
| `Orbit-Plot-Options-Screen-Light.jpg` | `OrbitPlotOptionsScreen-Light.jpg` |
| `Orbit-Plot-Select-Route-Screen-Dark.jpg` | `OrbitPlotSelectRouteScreen-Dark.jpg` |
| `Orbit-Plot-Select-Route-Screen-Light.jpg` | `OrbitPlotSelectRouteScreen-Light.jpg` |
| `Route-Warning-Dialog-Dark.jpg` | `RouteWarningDialog-Dark.jpg` |
| `Route-Warning-Dialog-Light.jpg` | `RouteWarningDialog-Light.jpg` |
| `Sensor-Selection-Modal-Dark.jpg` | `SensorSelectionModal-Dark.jpg` |
| `Sensor-Selection-Modal-Light.jpg` | `SensorSelectionModal-Light.jpg` |
| `Tachometer-Test-Modal-Dark.jpg` | `TachometerTestModal-Dark.jpg` |
| `Tachometer-Test-Modal-Light.jpg` | `TachometerTestModal-Light.jpg` |
| `Update-Routes-Screen-Light.jpg` | `UpdateRoutesScreen-Light.jpg` |

### 3-SpecialTests/5-TimeSynchronousAveraging
| Old | New |
| :--- | :--- |
| `Connection-Options-Screen-Light.jpg` | `ConnectionOptionsScreen-Light.jpg` |
| `Select-Route-Warning-Dialog-Dark.jpg` | `SelectRouteWarningDialog-Dark.jpg` |
| `Select-Route-Warning-Dialog-Light.jpg` | `SelectRouteWarningDialog-Light.jpg` |
| `Sensor-Selection-Modal-Dark.jpg` | `SensorSelectionModal-Dark.jpg` |
| `Sensor-Selection-Modal-Light.jpg` | `SensorSelectionModal-Light.jpg` |
| `Tachometer-Test-Modal-Dark.jpg` | `TachometerTestModal-Dark.jpg` |
| `Tachometer-Test-Modal-Light.jpg` | `TachometerTestModal-Light.jpg` |
| `Time-Synchronous-Averaging-Measurement-Screen-Light.jpg` | `TimeSynchronousAveragingMeasurementScreen-Light.jpg` |
| `Time-Synchronous-Averaging-More-Screen-Light.jpg` | `TimeSynchronousAveragingMoreScreen-Light.jpg` |
| `Time-Synchronous-Averaging-Options-Screen-Dark.jpg` | `TimeSynchronousAveragingOptionsScreen-Dark.jpg` |
| `Time-Synchronous-Averaging-Options-Screen-Light.jpg` | `TimeSynchronousAveragingOptionsScreen-Light.jpg` |
| `Time-Synchronous-Averaging-Select-Route-Screen-Dark.jpg` | `TimeSynchronousAveragingSelectRouteScreen-Dark.jpg` |
| `Time-Synchronous-Averaging-Select-Route-Screen-Light.jpg` | `TimeSynchronousAveragingSelectRouteScreen-Light.jpg` |
| `Torsional-Measurement-Select-Route-Screen-Dark.jpg` | `TorsionalMeasurementSelectRouteScreen-Dark.jpg` |
| `Update-Routes-Screen-Light.jpg` | `UpdateRoutesScreen-Light.jpg` |

### 3-SpecialTests/6-TorsionalMeasurement
| Old | New |
| :--- | :--- |
| `Number-of-Teeth-Numeric-Keypad-Light.jpg` | `NumberOfTeethNumericKeypad-Light.jpg` |
| `Sensor-Selection-Modal-Light.jpg` | `SensorSelectionModal-Light.jpg` |
| `Torsional-Measurement-Options-Screen-Light.jpg` | `TorsionalMeasurementOptionsScreen-Light.jpg` |
| `Torsional-Measurement-Screen-Light.jpg` | `TorsionalMeasurementScreen-Light.jpg` |
| `Torsional-Measurement-Screen-More-Options-Expanded-Light.jpg` | `TorsionalMeasurementScreenMoreOptionsExpanded-Light.jpg` |
| `Torsional-Measurement-Select-Route-Screen-Light.jpg` | `TorsionalMeasurementSelectRouteScreen-Light.jpg` |

### 3-SpecialTests/7-Waterfall
| Old | New |
| :--- | :--- |
| `Sensor-Selection-Modal-1-Light.jpg` | `SensorSelectionModal-Light.jpg` |
| `Waterfall-Measurement-Screen-Light.jpg` | `WaterfallMeasurementScreen-Light.jpg` |
| `Waterfall-Options-Screen-Light.jpg` | `WaterfallOptionsScreen-Light.jpg` |
| `Waterfall-Select-Route-Screen-Light.jpg` | `WaterfallSelectRouteScreen-Light.jpg` |

### 3-SpecialTests/8-MeasurementTest
| Old | New |
| :--- | :--- |
| `Cable-Integration-Light.jpg` | `CableIntegration-Light.jpg` |
| `Measurement-Test-More-Expand-Light.jpg` | `MeasurementTestMoreExpand-Light.jpg` |
| `Measurement-Tests-Options-Screen-Light.jpg` | `MeasurementTestsOptionsScreen-Light.jpg` |
| `Measurement-Tests-Screen-Light.jpg` | `MeasurementTestsScreen-Light.jpg` |
| `Measurement-Tests-Select-Route-Screen-Light.jpg` | `MeasurementTestsSelectRouteScreen-Light.jpg` |
| `Sensor-Selection-Modal-Light.jpg` | `SensorSelectionModal-Light.jpg` |

### 3-SpecialTests/9-BalancingProgram
| Old | New |
| :--- | :--- |
| `2-Plane-Balance-Light.jpg` | `2PlaneBalance-Light.jpg` |
| `2-Plane-Balance-Polar-Diagram-Screen-Light.jpg` | `2PlaneBalancePolarDiagramScreen-Light.jpg` |
| `Add-Machine-Data-Entry-Screen-Light.jpg` | `AddMachineDataEntryScreen-Light.jpg` |
| `Balancing-Program-Select-Route-Screen-Light.jpg` | `BalancingProgramSelectRouteScreen-Light.jpg` |
| `Select-Machine-More-Option-Expand-Light.jpg` | `SelectMachineMoreOptionExpand-Light.jpg` |
| `Select-Machine-Screen-Light.jpg` | `SelectMachineScreen-Light.jpg` |
| `Single-Plane-Light.jpg` | `SinglePlane-Light.jpg` |
| `Single-Plane-One-Shot-Light.jpg` | `SinglePlaneOneShot-Light.jpg` |

### 4-DCUSetup
| Old | New |
| :--- | :--- |
| `DCUSetupSubmenu.png` | `DCUSetupSubmenu-Light.png` |

### 4-DCUSetup/2-Diagnostics
| Old | New |
| :--- | :--- |
| `DCUSetup-Diagnostics-Submenu-Dark.png` | `DCUSetupDiagnosticsSubmenu-Dark.png` |
| `DCUSetup-Diagnostics-Submenu-Light.PNG` | `DCUSetupDiagnosticsSubmenu-Light.png` |

### 4-DCUSetup/2-Diagnostics/1-AccelerometerTests
| Old | New |
| :--- | :--- |
| `Accelerometer-Tests-Screen-Dark.png` | `AccelerometerTestsScreen-Dark.png` |
| `Accelerometer-Tests-Screen-With-X-axis-ChannelEnabled-Dark.png` | `AccelerometerTestsScreenWithXAxisChannelEnabled-Dark.png` |
| `Accelerometer-Tests-Screen-With-X-axis-ChannelEnabled-Light.png` | `AccelerometerTestsScreenWithXAxisChannelEnabled-Light.png` |
| `AccelerometerTests-Options-Screen-Dark.png` | `AccelerometerTestsOptionsScreen-Dark.png` |
| `AccelerometerTests-Options-Screen-Light.png` | `AccelerometerTestsOptionsScreen-Light.png` |
| `AccelerometerTests-Screen-Light.png` | `AccelerometerTestsScreen-Light.png` |
| `AccelerometerTests-Screen-Using-RMSTrendPlotType-Dark.png` | `AccelerometerTestsScreenUsingRMSTrendPlotType-Dark.png` |
| `AccelerometerTests-Screen-Using-RMSTrendPlotType-Light.png` | `AccelerometerTestsScreenUsingRMSTrendPlotType-Light.png` |

### 4-DCUSetup/2-Diagnostics/2-TachometerTests
| Old | New |
| :--- | :--- |
| `Tachometer-Test-Modal-Dark.png` | `TachometerTestModal-Dark.png` |
| `Tachometer-Test-Modal-Light.png` | `TachometerTestModal-Light.png` |

### 4-DCUSetup/2-Diagnostics/3-VoltageTest
| Old | New |
| :--- | :--- |
| `Limit-Tests-Screen-Dark.png` | `4-DCUSetup/2-Diagnostics/3-VoltageTests/LimitTestsScreen-Dark.png` |
| `Limit-Tests-Screen-Light.png` | `4-DCUSetup/2-Diagnostics/3-VoltageTests/LimitTestsScreen-Light.png` |
| `Start-Voltage-Tests-Screen-Dark.png` | `4-DCUSetup/2-Diagnostics/3-VoltageTests/StartVoltageTestsScreen-Dark.png` |
| `Start-Voltage-Tests-Screen-Light.png` | `4-DCUSetup/2-Diagnostics/3-VoltageTests/StartVoltageTestsScreen-Light.png` |
| `Voltage-TestsIn-Progress-Dark.png` | `4-DCUSetup/2-Diagnostics/3-VoltageTests/VoltageTestsInProgress-Dark.png` |
| `Voltage-TestsIn-Progress-Light.png` | `4-DCUSetup/2-Diagnostics/3-VoltageTests/VoltageTestsInProgress-Light.png` |

### 4-DCUSetup/2-Diagnostics/4-MeasurementTests
| Old | New |
| :--- | :--- |
| `Configure-Options-(Triaxial-Accelerometer)-Dark.jpg` | `ConfigureOptionsTriaxialAccelerometer-Dark.jpg` |
| `Configure-Options-(Triaxial-Accelerometer)-Light.jpg` | `ConfigureOptionsTriaxialAccelerometer-Light.jpg` |
| `Measurement-Tests-Screen-(More-options)-Dark.jpg` | `MeasurementTestsScreenMoreOptions-Dark.jpg` |
| `Measurement-Tests-Screen-(More-options)-Light.jpg` | `MeasurementTestsScreenMoreOptions-Light.jpg` |
| `Measurement-Tests-Screen-(Start-Measurement)-Dark.jpg` | `MeasurementTestsScreenStartMeasurement-Dark.jpg` |
| `Measurement-Tests-Screen-(Start-Measurement)-Light.jpg` | `MeasurementTestsScreenStartMeasurement-Light.jpg` |
| `Measurement-Tests-Screen-Dark.jpg` | `MeasurementTestsScreen-Dark.jpg` |
| `Measurement-Tests-Screen-Light.jpg` | `MeasurementTestsScreen-Light.jpg` |
| `Select-Route-List-Screen-Light.jpg` | `SelectRouteListScreen-Light.jpg` |
| `Sensor-Channel-Status-pop-up-Dark.jpg` | `SensorChannelStatusPopup-Dark.jpg` |
| `Sensor-Channel-Status-pop-up-Light.jpg` | `SensorChannelStatusPopup-Light.jpg` |
| `Sensor-Selection-Screen-Dark.png` | `SensorSelectionScreen-Dark.png` |
| `Sensor-Selection-Screen-Light.jpg` | `SensorSelectionScreen-Light.jpg` |
| `n.PNG` | `MeasurementTestsScreenTriaxSensor-Light.png` |

### 4-DCUSetup/2-Diagnostics/5-ScreenShots
| Old | New |
| :--- | :--- |
| `Display-Screenshots-Screen-Dark.jpg` | `4-DCUSetup/2-Diagnostics/5-Screenshots/DisplayScreenshotsScreen-Dark.jpg` |

### 4-DCUSetup/2-Diagnostics/5-Screenshots
| Old | New |
| :--- | :--- |
| `Display-Screenshots-Screen-Light.jpg` | `DisplayScreenshotsScreen-Light.jpg` |

### 4-DCUSetup/2-Diagnostics/6-FilterTest
| Old | New |
| :--- | :--- |
| `Test-Filters-(Options-Screen)-Dark.jpg` | `TestFiltersOptionsScreen-Dark.jpg` |
| `Test-Filters-(Options-Screen)-Light.jpg` | `TestFiltersOptionsScreen-Light.jpg` |
| `Test-Filters-(Pin-Pad)-Dark.jpg` | `TestFiltersPinPad-Dark.jpg` |
| `Test-Filters-(Pin-Pad)-Light.jpg` | `TestFiltersPinPad-Light.jpg` |
| `Test-Filters-Screen-(Run-Filter-Test-Result)-Dark.jpg` | `TestFiltersScreenRunFilterTestResult-Dark.jpg` |
| `Test-Filters-Screen-(Run-Filter-Test-Result)-Light.jpg` | `TestFiltersScreenRunFilterTestResult-Light.jpg` |
| `Test-Filters-Screen-(Run-Range-Test-Result)-Dark.jpg` | `TestFiltersScreenRunRangeTestResult-Dark.jpg` |
| `Test-Filters-Screen-(Run-Range-Test-Result)-Light.jpg` | `TestFiltersScreenRunRangeTestResult-Light.jpg` |
| `Test-Filters-Screen-Dark.jpg` | `TestFiltersScreen-Dark.jpg` |
| `Test-Filters-Screen-Light.jpg` | `TestFiltersScreen-Light.jpg` |

### 4-DCUSetup/3-Settings
| Old | New |
| :--- | :--- |
| `Settings-Submenu-Dark.jpg` | `SettingsSubmenu-Dark.jpg` |
| `Settings-Submenu-Light.jpg` | `SettingsSubmenu-Light.jpg` |

### 4-DCUSetup/3-Settings/1-DisableScreenBlanking
| Old | New |
| :--- | :--- |
| `Disable-Screen-Blanking-Dark.jpg` | `DisableScreenBlanking-Dark.jpg` |
| `Disable-Screen-Blanking-Light.jpg` | `DisableScreenBlanking-Light.jpg` |

### 4-DCUSetup/3-Settings/10-WifiSetup
| Old | New |
| :--- | :--- |
| `WiFi-Adapter-Disabled-(Error-message)-Dark.jpg` | `WiFiAdapterDisabledErrorMessage-Dark.jpg` |
| `WiFi-Adapter-Disabled-(Error-message)-Light.jpg` | `WiFiAdapterDisabledErrorMessage-Light.jpg` |
| `WiFi-Setup-Screen-Dark.jpg` | `WiFiSetupScreen-Dark.jpg` |
| `WiFi-Setup-Screen-Light.jpg` | `WiFiSetupScreen-Light.jpg` |

### 4-DCUSetup/3-Settings/2-EmailSettings
| Old | New |
| :--- | :--- |
| `Enter-Email-(On-screen-keyboard)-Light.jpg` | `EnterEmailOnScreenKeyboard-Light.jpg` |
| `Enter-Email-Module-Dark.jpg` | `EnterEmailModule-Dark.jpg` |
| `Enter-Email-Module-Light.jpg` | `EnterEmailModule-Light.jpg` |

### 4-DCUSetup/3-Settings/3-TechnicianName
| Old | New |
| :--- | :--- |
| `Enter-Technician-Name-(On-screen-keyboard)-Light.jpg` | `EnterTechnicianNameOnScreenKeyboard-Light.jpg` |
| `Enter-Technician-Name-Screen-Dark.jpg` | `EnterTechnicianNameScreen-Dark.jpg` |
| `Enter-Technician-Name-Screen-Light.jpg` | `EnterTechnicianNameScreen-Light.jpg` |

### 4-DCUSetup/3-Settings/4-Language
| Old | New |
| :--- | :--- |
| `Select-Language-Screen-Dark.jpg` | `SelectLanguageScreen-Dark.jpg` |
| `Select-Language-Screen-Light.jpg` | `SelectLanguageScreen-Light.jpg` |

### 4-DCUSetup/3-Settings/5-Theme
| Old | New |
| :--- | :--- |
| `Display-Settings-Screen-Dark.jpg` | `DisplaySettingsScreen-Dark.jpg` |
| `Display-Settings-Screen-Light.jpg` | `DisplaySettingsScreen-Light.jpg` |

### 4-DCUSetup/3-Settings/6-Units
| Old | New |
| :--- | :--- |
| `Select-Unit-Screen-Dark.jpg` | `SelectUnitScreen-Dark.jpg` |
| `Select-Unit-Screen-Light.jpg` | `SelectUnitScreen-Light.jpg` |

### 4-DCUSetup/3-Settings/7-UpdateJobNumbers
| Old | New |
| :--- | :--- |
| `Enter-Job-ID-Number-(pin-pad)-Dark.jpg` | `EnterJobIDNumberPinPad-Dark.jpg` |
| `Enter-Job-ID-Number-(pin-pad)-Light.jpg` | `EnterJobIDNumberPinPad-Light.jpg` |
| `Update-Job-Number-Screen-Dark.jpg` | `UpdateJobNumberScreen-Dark.jpg` |
| `Update-Job-Number-Screen-Light.jpg` | `UpdateJobNumberScreen-Light.jpg` |

### 4-DCUSetup/3-Settings/8-ShowSystemSettings
| Old | New |
| :--- | :--- |
| `System-Settings-Modal-Dark.jpg` | `SystemSettingsModal-Dark.jpg` |
| `System-Settings-Modal-Light.jpg` | `SystemSettingsModal-Light.jpg` |

### 4-DCUSetup/3-Settings/9-CMASServer
| Old | New |
| :--- | :--- |
| `CMAS-OPC-Disabled-(Error-message-dialogbox)-Light.jpg` | `CMASOPCDisabledErrorMessageDialogBox-Light.jpg` |
| `Delete-CMAS-Server-(confirmation-dialog)-Dark.jpg` | `DeleteCMASServerConfirmationDialog-Dark.jpg` |
| `Delete-CMAS-Server-(confirmation-dialog)-Light.jpg` | `DeleteCMASServerConfirmationDialog-Light.jpg` |
| `Enter-CMAS-(on-screen-keyboard)-Light.jpg` | `EnterCMASOnScreenKeyboard-Light.jpg` |
| `Select-CMAS-System-Screen-Dark.jpg` | `SelectCMASSystemScreen-Dark.jpg` |
| `Select-CMAS-System-Screen-Light.jpg` | `SelectCMASSystemScreen-Light.jpg` |

### 4-DCUSetup/4-AdvanceSettings
| Old | New |
| :--- | :--- |
| `Advanced-Settings-Submenu-Light.jpg` | `AdvancedSettingsSubmenu-Light.jpg` |
| `Enter-Password-Modal-Dark.jpg` | `EnterPasswordModal-Dark.jpg` |
| `Enter-Password-Modal-Light.jpg` | `EnterPasswordModal-Light.jpg` |
| `Wrong-Password-Dialog-Dark.jpg` | `WrongPasswordDialog-Dark.jpg` |
| `Wrong-Password-Dialog-Light.jpg` | `WrongPasswordDialog-Light.jpg` |

### 4-DCUSetup/4-AdvanceSettings/1-AuxDCOffsetTest
| Old | New |
| :--- | :--- |
| `Aux-DC-Offset-Test-Modal-Light.jpg` | `AuxDCOffsetTestModal-Light.jpg` |

### 4-DCUSetup/4-AdvanceSettings/10-ShowFilterTable
| Old | New |
| :--- | :--- |
| `Show-Filter-Table-Modal-Light.jpg` | `ShowFilterTableModal-Light.jpg` |

### 4-DCUSetup/4-AdvanceSettings/11-ShowBatteryTable
| Old | New |
| :--- | :--- |
| `Show-Battery-Table-Modal-Light.jpg` | `ShowBatteryTableModal-Light.jpg` |

### 4-DCUSetup/4-AdvanceSettings/2-BiasStabilityTest
| Old | New |
| :--- | :--- |
| `Set-Bias-Stability-Level-Modal-Light.jpg` | `SetBiasStabilityLevelModal-Light.jpg` |
| `Set-Bias-Stability-Level-Numeric-Keypad-Light.jpg` | `SetBiasStabilityLevelNumericKeypad-Light.jpg` |

### 4-DCUSetup/4-AdvanceSettings/3-DCUType
| Old | New |
| :--- | :--- |
| `DCU-Type-Screen-Light.jpg` | `DCUTypeScreen-Light.jpg` |

### 4-DCUSetup/4-AdvanceSettings/4-DeviceId
| Old | New |
| :--- | :--- |
| `Enter-Device-ID-Modal-Light.jpg` | `EnterDeviceIDModal-Light.jpg` |

### 4-DCUSetup/4-AdvanceSettings/5-DFPID
| Old | New |
| :--- | :--- |
| `Enter-DFPID-Modal-Light.jpg` | `EnterDFPIDModal-Light.jpg` |

### 4-DCUSetup/4-AdvanceSettings/6-MasterBatteryFile
| Old | New |
| :--- | :--- |
| `Generate-Master-Battery-Curve-Modal-Light.jpg` | `GenerateMasterBatteryCurveModal-Light.jpg` |

### 4-DCUSetup/4-AdvanceSettings/7-SequenceNumberReset
| Old | New |
| :--- | :--- |
| `Sequence-Number-Reset-Confirmation-Dialog-Light.jpg` | `SequenceNumberResetConfirmationDialog-Light.jpg` |

### 4-DCUSetup/4-AdvanceSettings/8-SystemSwitches
| Old | New |
| :--- | :--- |
| `Change-Username-Confirmation-Dialog-Box-Light.jpg` | `ChangeUsernameConfirmationDialogBox-Light.jpg` |
| `Enter-Technician-Name-Modal-Light.jpg` | `EnterTechnicianNameModal-Light.jpg` |
| `System-Switches-Screen-Light.jpg` | `SystemSwitchesScreen-Light.jpg` |

### 4-DCUSetup/4-AdvanceSettings/9-TestMicroPrograms
| Old | New |
| :--- | :--- |
| `Test-Micro-Programs-Modal-Light.jpg` | `TestMicroProgramsModal-Light.jpg` |
| `Test-Micro-Warning-Dialogbox-light.jpg` | `TestMicroWarningDialogBox-Light.jpg` |

### Appendix/A-UREMeasurements
| Old | New |
| :--- | :--- |
| `Shaft-Speed-(RPM)-Entry-for-URE-Measurement-Light.png` | `ShaftSpeedRPMEntryForUREMeasurement-Light.png` |
| `URE-Accelerometer-Connection-Prompt-Light.png` | `UREAccelerometerConnectionPrompt-Light.png` |

### Appendix/B-Troubleshooting/1-Routes
| Old | New |
| :--- | :--- |
| `Add-Points-Add-ID-Error-Message-Light.jpg` | `AddPointsAddIDErrorMessage-Light.jpg` |
| `Add-Points-Frequency-Change-Error-Message-Light.jpg` | `AddPointsFrequencyChangeErrorMessage-Light.jpg` |
| `Add-Points-ID-Not-Found-Error-Message-Light.jpg` | `AddPointsIDNotFoundErrorMessage-Light.jpg` |
| `Add-Points-Waterfall-Measurement-Error-Message-Light.jpg` | `AddPointsWaterfallMeasurementErrorMessage-Light.jpg` |
| `Delete-Route-Error-Message-Light.jpg` | `DeleteRouteErrorMessage-Light.jpg` |
| `Plot-Screen-Error-Message-Light.jpg` | `PlotScreenErrorMessage-Light.jpg` |
| `Select-Route-Warning-Dialogbox-Light.jpg` | `SelectRouteWarningDialogBox-Light.jpg` |

### Appendix/B-Troubleshooting/2-Measurements
| Old | New |
| :--- | :--- |
| `Customer-Signature-Recipients-Must-Be-Selected-Dialog-Light.jpg` | `CustomerSignatureRecipientsMustBeSelectedDialog-Light.jpg` |
| `Delete-Measurements-Confirmation-Dialog-Light.jpg` | `DeleteMeasurementsConfirmationDialog-Light.jpg` |
| `Delete-Measurements-Warning-Dialog-Light.jpg` | `DeleteMeasurementsWarningDialog-Light.jpg` |
| `Display-Trouble-Code-(Delete-Confirmation-Dialog)-Light.jpg` | `DisplayTroubleCodeDeleteConfirmationDialog-Light.jpg` |
| `Not-Measured-Machines-Report-USB-Stick-Not-Found-Dialog-Light.jpg` | `NotMeasuredMachinesReportUSBStickNotFoundDialog-Light.jpg` |
| `Select-Recipients-Delete-Recipient-Confirmation-Dialog-Light.jpg` | `SelectRecipientsDeleteRecipientConfirmationDialog-Light.jpg` |
| `Transmit-Measurements-Warning-Dialog-Light.jpg` | `TransmitMeasurementsWarningDialog-Light.jpg` |

### Appendix/B-Troubleshooting/3-SpecialTests
| Old | New |
| :--- | :--- |
| `Balancing-Program-(Machine-Description-Warning-Dialog)-Light.jpg` | `BalancingProgramMachineDescriptionWarningDialog-Light.jpg` |
| `Bump-Test-(Route-Age-Warning-Dialog)-Light.jpg` | `BumpTestRouteAgeWarningDialog-Light.jpg` |

### Appendix/B-Troubleshooting/4-DCUSetup
| Old | New |
| :--- | :--- |
| `CMAS-Update-Download-Error-Light.png` | `CMASUpdateDownloadError-Light.png` |
| `Figure 3_Tachometer-Test- No-signal- condition.png` | `TachometerTestNoSignalCondition-Light.png` |
| `Touchscreen-Test-Warning-Dialog-Box-Light.png.png` | `TouchscreenTestWarningDialogBox-Light.png` |
