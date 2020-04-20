import React, { useState, useEffect, useRef } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid/";
import Textfield from "@material-ui/core/TextField";
import { MenuItem, Slider, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Barcode from "react-barcode";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Menu from "@material-ui/core/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import TextFormatIcon from "@material-ui/icons/TextFormat";

import "./label-creator.styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25h",
    },
  },
  header: {
    fontSize: "24px",
  },
}));

const codeFormats = [
  { value: "CODE128A", label: "Code 128A" },
  { value: "CODE128B", label: "Code 128B" },
  { value: "CODE128C", label: "Code 128C" },
  { value: "CODE39", label: "Code 39" },
  { value: "UPC", label: "UPC" },
  { value: "MSI", label: "MSI" },
  { value: "IFT14", label: "ITF-14" },
  { value: "EAN13", label: "EAN-13" },
  { value: "EAN8", label: "EAN-8" },
  { value: "EAN5", label: "EAN-5" },
];

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

const labelTypes = [
  { value: "product", label: "Product" },
  { value: "package", label: "Package" },
];

function LabelCreator() {
  const classes = useStyles();
  const [fontStyle, setFontStyle] = useState([]);
  const [anchorEl, setAnchorEl] = useState({
    lineColor: null,
    settings: null,
    font: null,
  });

  const open = {
    color: Boolean(anchorEl.lineColor),
    settings: Boolean(anchorEl.settings),
    font: Boolean(anchorEl.font),
  };

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
    labelWidth: "2.63in",
    labelHeight: "1in",
    labelTitle: "Preview Label",
  });

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
          labelWidth: "2.63in",
          labelHeight: "1in",
          fontSize: 16,
        }));
        break;
      case "4x6":
        setSettings((settings) => ({
          ...settings,
          width: 2.75,
          height: 90,
          labelWidth: "4in",
          labelHeight: "6in",
          fontSize: 22,
        }));
        break;
      case "2x3":
        setSettings((settings) => ({
          ...settings,
          width: 1.25,
          height: 25,
          labelWidth: "2in",
          labelHeight: "3in",
          fontSize: 16,
        }));
        break;
      case "3x2":
        setSettings((settings) => ({
          ...settings,
          width: 2,
          height: 25,
          labelWidth: "3in",
          labelHeight: "2in",
          fontSize: 18,
        }));
        break;
      case "2x2":
        setSettings((settings) => ({
          ...settings,
          format: "CODE128A",
          width: 1.25,
          height: 25,
          labelWidth: "2in",
          labelHeight: "2in",
        }));
        break;
      default:
    }
  };

  console.log("Settings", settings);
  /* Updates state values when modified
   **********************************************/
  //This handler is used for textfields
  const handleChange = (name) => (e) => {
    setSettings((settings) => ({ ...settings, [name]: e.target.value }));
  };
  // This event handler will change all other items such as sliders and material-ui buttons.
  const handleChangeOther = (name) => (e, value) => {
    setSettings((settings) => ({ ...settings, [name]: value }));
  };
  //Font formatting needs to be separate because the information is stored as an array and will not be passed to the settings with a ... (spread) when calling the barcode component.
  const handleFormat = (event, newFormats) => {
    setFontStyle(newFormats);
  };

  const handleClick = (selection) => (event) => {
    setAnchorEl((anchorEl) => ({ ...anchorEl, [selection]: event.currentTarget }));
  };

  const handleClickMenuItem = (selection, option) => {
    //Pass the "selection" as a string and then alter the state of AnchorEl
    setSettings((settings) => ({ ...settings, [selection]: option.value }));
    setAnchorEl((anchorEl) => ({ ...anchorEl, [selection]: null }));
  };

  const toggleTextVisibility = (e) => {
    setSettings((displayValue) => ({ ...settings, displayValue: !settings.displayValue }));
  };

  useEffect(() => {
    //This useEffect is checked every time the fontStyle state changes.
    //If the state has an array of items in it such as, ["bold", "italics"]
    //it will join those together into one string and insert into the Settings state.
    if (fontStyle.length > 1) {
      setSettings((settings) => ({ ...settings, fontOptions: fontStyle.join(" ") }));
    } else setSettings((settings) => ({ ...settings, fontOptions: fontStyle.toString() }));
  }, [fontStyle]);

  return (
    <Container>
      <Typography variant='h3' gutterBottom>
        Barcode Label Generator
      </Typography>
      <Grid container direction='row' spacing={2}>
        <Grid item sm={12} md={6}>
          {/* The first panel of information goes here and will at most ever take up half the screen*/}
          <Paper elevation={3}>
            <Grid container direction='row' spacing={1} style={{ padding: 8 }}>
              <Grid item xs={12}>
                <Typography variant='h5'>Settings</Typography>
                <Divider />
              </Grid>
              {/* Adding toolbar for small buttons */}
              <Grid item>
                <Grid container direction='row' spacing={1}>
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
                        <Menu
                          id='settings'
                          anchorEl={anchorEl.settings}
                          keepMounted
                          open={open.settings}
                        >
                          {presetMenuItems.map((option) => (
                            <MenuItem
                              key={option.value}
                              onClick={(event) =>
                                applyPreset(option.value, "settings", option, event)
                              }
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      </ToggleButtonGroup>
                      <ToggleButtonGroup
                        value={fontStyle}
                        onChange={handleFormat}
                        aria-label='text formatting'
                      >
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
                        <ToggleButton
                          value='left'
                          aria-label='left aligned'
                          style={{ border: "none" }}
                        >
                          <FormatAlignLeftIcon />
                        </ToggleButton>
                        <ToggleButton
                          value='center'
                          aria-label='centered'
                          style={{ border: "none" }}
                        >
                          <FormatAlignCenterIcon />
                        </ToggleButton>
                        <ToggleButton
                          value='right'
                          aria-label='right aligned'
                          style={{ border: "none" }}
                        >
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
                        <ToggleButton
                          value='top'
                          aria-label='left aligned'
                          style={{ border: "none" }}
                        >
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
              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid container direction='row' spacing={1} justify='space-around'>
                <Grid item>
                  {/* Left Mini Panel */}
                  <Grid container direction='column' spacing={3}>
                    {/* Barcode Value Textbox */}
                    <Grid item>
                      <Textfield
                        size='small'
                        style={{ width: "100%" }}
                        variant='outlined'
                        value={settings.value}
                        name='value'
                        label='Barcode value'
                        onChange={handleChange("value")}
                      />
                    </Grid>
                    {/* Format Menu */}
                    <Grid item>
                      <Textfield
                        style={{ width: "100%" }}
                        size='small'
                        variant='outlined'
                        select
                        name='format'
                        label='Format'
                        value={settings.format}
                        onChange={handleChange("format")}
                      >
                        {codeFormats.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Textfield>
                    </Grid>
                    {/* Title Textbox */}
                    <Grid item>
                      <Textfield
                        size='small'
                        style={{ width: "100%" }}
                        variant='outlined'
                        value={settings.labelTitle}
                        name='labelTitle'
                        label='Label Title'
                        onChange={handleChange("labelTitle")}
                      />
                    </Grid>
                    {/* Put additional rows in the left mini column here
                      <Grid item> information </Grid>
                    */}
                  </Grid>
                </Grid>
                <Grid item>
                  {/* Right Mini Panel */}
                  <Grid container direction='column'>
                    <Grid item>
                      <Typography id='width-label' gutterBottom>
                        Barcode Width
                      </Typography>
                      <Slider
                        id='width'
                        aria-labelledby='width-label'
                        value={settings.width}
                        marks={true}
                        min={1}
                        max={3}
                        step={0.25}
                        valueLabelDisplay='auto'
                        onChange={handleChangeOther("width")}
                        style={{ width: "175px" }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography id='height-label' gutterBottom>
                        Barcode Height
                      </Typography>
                      <Slider
                        id='height'
                        aria-labelledby='height-label'
                        step={10}
                        marks={true}
                        valueLabelDisplay='auto'
                        max={120}
                        min={10}
                        value={settings.height}
                        onChange={handleChangeOther("height")}
                        style={{ width: "175px" }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography id='font-size-label' gutterBottom>
                        Font Size
                      </Typography>
                      <Slider
                        id='fontSize'
                        aria-labelledby='font-size-label'
                        defaultValue={18}
                        step={2}
                        marks={true}
                        valueLabelDisplay='auto'
                        value={settings.size}
                        max={24}
                        min={10}
                        style={{ width: "175px" }}
                        onChange={handleChangeOther("fontSize")}
                      />
                    </Grid>
                    <Grid item>
                      <Typography id='text-margin-label' gutterBottom>
                        Text Margin
                      </Typography>
                      <Slider
                        id='textMargin'
                        aria-labelledby='text-margin-label'
                        step={1}
                        marks={true}
                        valueLabelDisplay='auto'
                        max={10}
                        min={0}
                        value={settings.textMargin}
                        style={{ width: "175px" }}
                        onChange={handleChangeOther("textMargin")}
                      />
                    </Grid>
                    <Grid item>
                      <Typography id='margin-label' gutterBottom>
                        Margin Size
                      </Typography>
                      <Slider
                        id='margin'
                        aria-labelledby='margin-label'
                        step={5}
                        marks={true}
                        valueLabelDisplay='auto'
                        max={25}
                        min={5}
                        value={settings.margin}
                        style={{ width: "175px" }}
                        onChange={handleChangeOther("margin")}
                      />
                    </Grid>
                    {/* Put additional rows in the right mini column here
                      <Grid item> information </Grid>
                    */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item>
          <Paper elevation={3}>
            <Grid container direction='row' spacing={1} style={{ padding: 8 }}>
              <Grid item xs={12}>
                <Typography variant='h5'>Preview</Typography>
                <Divider />
                <div
                  style={{
                    border: "1px solid #ababab",
                    width: settings.labelWidth,
                    height: settings.labelHeight,
                  }}
                >
                  <Grid container direction='column' spacing={0.5} textAlign='left'>
                    <Grid item>{settings.labelTitle}</Grid>

                    <Grid item>
                      <Barcode {...settings} />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LabelCreator;
