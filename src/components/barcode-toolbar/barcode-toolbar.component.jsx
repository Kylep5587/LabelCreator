import { React, useState } from "react";
import { ToggleButton, ToggleButtonGroup, Grid, Paper, MenuItem, Menu } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const [settings, setSettings] = useState({
  value: Math.floor(Math.random() * 100000000).toString(),
  format: "CODE128A",
  renderer: "svg",
  width: 1.5,
  height: 20,
  displayValue: true,
  fontOptions: "",
  font: "monospace",
  textAlign: "center",
  textPosition: "bottom",
  textMargin: 2,
  fontSize: 16,
  background: "#ffffff",
  lineColor: "#000000",
  margin: 10,
});

const colors = [
  { value: "#ffffff", label: "White" },
  { value: "#000000", label: "Black" },
  { value: "#0000ff", label: "Blue" },
  { value: "#ff0000", label: "Red" },
  { value: "#808080", label: "Gray" },
  { value: "#008000", label: "Green" },
];

const presetMenuItems = [
  { value: "fnsku", label: "FNSKU" },
  { value: "2x2", label: "2 x 2" },
  { value: "2x3", label: "2 x 3" },
  { value: "3x2", label: "3 x 2" },
  { value: "4x6", label: "4 x 6" },
];

const fontFaces = [
  { value: "monospace", label: "Monospace" },
  { value: "arial", label: "Arial" },
  { value: "calibri", label: "Calibri" },
  { value: "consolas", label: "Consolas" },
  { value: "tahoma", label: "Tahoma" },
  { value: "verdana", label: "Verdana" },
];

// Applies styling for label presets
const applyPreset = (preset, selection, option) => {
  setAnchorEl((anchorEl) => ({ ...anchorEl, [selection]: null })); // Closes the menu
  switch (preset) {
    case "fnsku":
      setSettings((settings) => ({
        ...settings,
        format: "CODE128A",
        width: 1.5,
        height: 20,
        fontSize: 16,
      }));
      setLabelDetails((labelDetails) => ({
        ...labelDetails,
        labelWidth: "2.63in",
        labelHeight: "1in",
      }));
      break;
    case "4x6":
      setSettings((settings) => ({
        ...settings,
        width: 2.5,
        height: 90,
        fontSize: 22,
      }));
      setLabelDetails((labelDetails) => ({
        ...labelDetails,
        labelWidth: "4in",
        labelHeight: "6in",
      }));
      break;
    case "2x3":
      setSettings((settings) => ({
        ...settings,
        width: 1,
        height: 25,
        fontSize: 16,
      }));
      setLabelDetails((labelDetails) => ({
        ...labelDetails,
        labelWidth: "2in",
        labelHeight: "3in",
      }));
      break;
    case "3x2":
      setSettings((settings) => ({
        ...settings,
        width: 1.75,
        height: 25,
        fontSize: 18,
      }));
      setLabelDetails((labelDetails) => ({
        ...labelDetails,
        labelWidth: "3in",
        labelHeight: "2in",
      }));
      break;
    case "2x2":
      setSettings((settings) => ({
        ...settings,
        format: "CODE128A",
        width: 1,
        height: 25,
      }));
      setLabelDetails((labelDetails) => ({
        ...labelDetails,
        labelWidth: "2in",
        labelHeight: "2in",
      }));
      break;
    default:
  }
};

return (
  <Grid item>
    <Grid container direction='row' spacing={1} style={{ padding: 8 }}>
      <Grid item xs={12}>
        <Paper>
          <ToggleButtonGroup>
            {/* Presets button and menu */}
            <ToggleButton
              style={{ border: "none" }}
              aria-label='more'
              aria-controls='long-menu'
              aria-haspopup='true'
              value='settings'
              onClick={handleClick("settings")}
            >
              <SettingsIcon />
            </ToggleButton>
            <Menu id='settings' anchorEl={anchorEl.settings} keepMounted open={open.settings}>
              {presetMenuItems.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={(event) => applyPreset(option.value, "settings", option, event)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </ToggleButtonGroup>
          <ToggleButtonGroup value={fontStyle} onChange={handleFormat} aria-label='text formatting'>
            {/* Bold and Italic buttons */}
            <ToggleButton value='bold' aria-label='bold' style={{ border: "none" }}>
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value='italic' aria-label='italic' style={{ border: "none" }}>
              <FormatItalicIcon />
            </ToggleButton>

            {/* Font style menu item button */}
          </ToggleButtonGroup>
          <ToggleButtonGroup>
            <ToggleButton
              style={{ border: "none" }}
              aria-label='font-faces'
              aria-controls='long-menu'
              aria-haspopup='true'
              onClick={handleClick("font")}
            >
              <TextFormatIcon />
            </ToggleButton>
            <Menu
              name='font'
              aria-label='font'
              defaultValue='monospace'
              anchorEl={anchorEl.font}
              keepMounted
              open={open.font}
              onClose={handleClickMenuItem}
            >
              {fontFaces.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={(event) => handleClickMenuItem("font", option, event)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </ToggleButtonGroup>

          {/* Text alignment buttons */}
          <ToggleButtonGroup
            style={{ marginLeft: 1 }}
            value={settings.textAlign}
            exclusive
            onChange={handleChangeOther("textAlign")}
            aria-label='text alignment'
          >
            <ToggleButton value='left' aria-label='left aligned' style={{ border: "none" }}>
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value='center' aria-label='centered' style={{ border: "none" }}>
              <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value='right' aria-label='right aligned' style={{ border: "none" }}>
              <FormatAlignRightIcon />
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Text position button (above or below barcode) */}
          <ToggleButtonGroup
            style={{ marginLeft: 1 }}
            value={settings.textPosition}
            exclusive
            onChange={handleChangeOther("textPosition")}
            aria-label='text alignment'
          >
            <ToggleButton value='top' aria-label='left aligned' style={{ border: "none" }}>
              <VerticalAlignTopIcon />
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Barcode color button and menu */}
          <ToggleButtonGroup>
            <ToggleButton
              value={settings.lineColor}
              style={{ border: "none" }}
              aria-label='more'
              aria-controls='long-menu'
              aria-haspopup='true'
              onClick={handleClick("lineColor")}
            >
              <FormatColorFillIcon />
            </ToggleButton>
            <Menu
              id='lineColor'
              name='lineColor'
              anchorEl={anchorEl.lineColor}
              keepMounted
              open={open.color}
              onClose={handleClickMenuItem}
            >
              {colors.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={(event) => handleClickMenuItem("lineColor", option, event)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </ToggleButtonGroup>

          <ToggleButtonGroup value={settings.displayValue}>
            <ToggleButton style={{ border: "none" }} value='showHide'>
              {settings.displayValue ? (
                <VisibilityOffIcon onClick={toggleTextVisibility} />
              ) : (
                <VisibilityIcon onClick={toggleTextVisibility} />
              )}
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Grid>
    </Grid>
  </Grid>
);
