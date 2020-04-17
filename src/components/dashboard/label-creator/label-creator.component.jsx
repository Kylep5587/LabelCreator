import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid/";
import Textfield from "@material-ui/core/TextField";
import {
  MenuItem,
  Slider,
  Typography,
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Barcode from "react-barcode";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import IconButton from "@material-ui/core/IconButton";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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

const fontStyles = [
  { value: " ", label: "None" },
  { value: "bold", label: "Bold" },
  { value: "italic", label: "Italic" },
  { value: "bold italic", label: "Bold Italic" },
];

const alignments = [
  { value: "center", label: "Center" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

const textPositions = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
];

function LabelCreator() {
  const classes = useStyles();
  const [fontStyle, setFontStyle] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [settings, setSettings] = useState({
    value: Math.floor(Math.random() * 100000000),
    format: "CODE128A",
    renderer: "svg",
    width: 2,
    height: 100,
    displayValue: true,
    fontOptions: "",
    font: "monospace",
    textAlign: "center",
    textPosition: "bottom",
    textMargin: 2,
    fontSize: 20,
    background: "#ffffff",
    lineColor: "#000000",
    margin: 10,
  });

  /* Updates state values when modified
   **********************************************/
  const handleChangeByName = (e) => {
    const { name, value } = e.target;
    setSettings((settings) => ({ ...settings, [name]: value }));
  };

  const handleChangeByID = (e, value) => {
    setSettings((settings) => ({ ...settings, [e.target.id]: value }));
  };

  const handleAlignment = (event, newAlignment) => {
    setSettings((settings) => ({ ...settings, textAlign: newAlignment }));
  };

  const handleVerticalAlignment = (event, value, name) => {
    setSettings((settings) => ({ ...settings, textPosition: value }));
  };

  const handleFormat = (event, newFormats) => {
    setFontStyle(newFormats);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePickColor = (option) => {
    setSettings((settings) => ({ ...settings, lineColor: option.value }));
    setAnchorEl(null);
  };

  const handleChangeDropDown = (event, index, value) => {
    setSettings({ ...settings, format: value });
  };

  const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      margin: theme.spacing(0.5),
      border: "none",
      padding: theme.spacing(0, 1),
      "&:not(:first-child)": {
        borderRadius: theme.shape.borderRadius,
      },
      "&:first-child": {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }))(ToggleButtonGroup);

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
                      <StyledToggleButtonGroup
                        value={fontStyle}
                        onChange={handleFormat}
                        aria-label='text formatting'
                      >
                        <ToggleButton value='bold' aria-label='bold'>
                          <FormatBoldIcon />
                        </ToggleButton>
                        <ToggleButton value='italic' aria-label='italic'>
                          <FormatItalicIcon />
                        </ToggleButton>
                      </StyledToggleButtonGroup>

                      <StyledToggleButtonGroup
                        style={{ marginLeft: 1 }}
                        value={settings.textAlign}
                        exclusive
                        onChange={handleAlignment}
                        aria-label='text alignment'
                      >
                        <ToggleButton value='left' aria-label='left aligned'>
                          <FormatAlignLeftIcon />
                        </ToggleButton>
                        <ToggleButton value='center' aria-label='centered'>
                          <FormatAlignCenterIcon />
                        </ToggleButton>
                        <ToggleButton value='right' aria-label='right aligned'>
                          <FormatAlignRightIcon />
                        </ToggleButton>
                      </StyledToggleButtonGroup>

                      <StyledToggleButtonGroup
                        style={{ marginLeft: 1 }}
                        value={settings.textPosition}
                        exclusive
                        onChange={handleVerticalAlignment}
                        aria-label='text alignment'
                      >
                        <ToggleButton value='top' aria-label='left aligned'>
                          <VerticalAlignTopIcon />
                        </ToggleButton>
                      </StyledToggleButtonGroup>

                      <ToggleButtonGroup>
                        <IconButton
                          aria-label='more'
                          aria-controls='long-menu'
                          aria-haspopup='true'
                          onClick={handleClick}
                        >
                          <FormatColorFillIcon />
                        </IconButton>
                        <Menu
                          id='lineColor'
                          name='lineColor'
                          anchorEl={anchorEl}
                          keepMounted
                          open={open}
                          onClose={handlePickColor}
                        >
                          {console.log("colors", colors)}
                          {colors.map((option) => (
                            <MenuItem
                              key={option.value}
                              primaryText={option.label}
                              onClick={(event) => handlePickColor(option, event)}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Menu>
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
                    <Grid item>
                      <Textfield
                        size='small'
                        style={{ width: "100%" }}
                        variant='outlined'
                        value={settings.value}
                        name='value'
                        label='Barcode value'
                        onChange={handleChangeByName}
                      />
                    </Grid>
                    <Grid item>
                      {/* <DropDownMenu value={settings.format} onChange={handleChangeDropDown}>
                        {codeFormats.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </DropDownMenu> */}
                      {console.log("Settings...", settings)}
                      <Textfield
                        style={{ width: "100%" }}
                        size='small'
                        variant='outlined'
                        select
                        name='format'
                        label='Format'
                        value={settings.format}
                        onChange={handleChangeByName}
                      >
                        {codeFormats.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Textfield>
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
                        defaultValue={settings.width}
                        marks={true}
                        min={1}
                        max={5}
                        step={1}
                        valueLabelDisplay='auto'
                        onChange={handleChangeByID}
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
                        defaultValue={50}
                        step={10}
                        marks={true}
                        valueLabelDisplay='auto'
                        max={120}
                        min={10}
                        onChange={handleChangeByID}
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
                        max={24}
                        min={10}
                        style={{ width: "175px" }}
                        onChange={handleChangeByID}
                      />
                    </Grid>
                    <Grid item>
                      <Typography id='text-margin-label' gutterBottom>
                        Text Margin
                      </Typography>
                      <Slider
                        id='textMargin'
                        aria-labelledby='text-margin-label'
                        defaultValue={2}
                        step={1}
                        marks={true}
                        valueLabelDisplay='auto'
                        max={10}
                        min={0}
                        style={{ width: "175px" }}
                        onChange={handleChangeByID}
                      />
                    </Grid>
                    <Grid item>
                      <Typography id='margin-label' gutterBottom>
                        Margin Size
                      </Typography>
                      <Slider
                        id='margin'
                        aria-labelledby='margin-label'
                        defaultValue={10}
                        step={5}
                        marks={true}
                        valueLabelDisplay='auto'
                        max={25}
                        min={5}
                        style={{ width: "175px" }}
                        onChange={handleChangeByID}
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
                <Barcode {...settings} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid maxWidth='sm'></Grid>
    </Container>
  );
}

export default LabelCreator;
