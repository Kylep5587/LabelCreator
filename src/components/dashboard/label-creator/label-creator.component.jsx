import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid/";
import Textfield from "@material-ui/core/TextField";
import { MenuItem, Slider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Barcode from "react-barcode";

import "./label-creator.styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25h",
    },
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

  const [settings, setSettings] = useState({
    value: "Hi",
    format: "CODE128",
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
  const handleChange = (e) => {
    let change = {};
    change[e.target.name] = e.target.value;
    setSettings({ change });
  };

  return (
    <Container maxWidth='80vw'>
      <form className={classes.root} noValidate autoComplete='off'>
        <Grid container direction='row' justify='space-around' spacing={2} alignItems='flex-end'>
          <Grid item xl lg sm md xs>
            <Textfield
              id='value'
              label='Barcode value'
              style={{ width: "175px" }}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xl lg sm md xs>
            <Textfield
              select
              id='format'
              label='Format'
              defaultValue='CODE128A'
              style={{ width: "150px" }}
              onChange={handleChange}
            >
              {codeFormats.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Textfield>
          </Grid>

          <Grid item xl lg sm md xs>
            <Typography id='width-label' gutterBottom>
              Barcode Width
            </Typography>
            <Slider
              id='width'
              aria-labelledby='width-label'
              defaultValue={2}
              marks={true}
              min={1}
              max={5}
              step={1}
              valueLabelDisplay='auto'
              style={{ width: "175px" }}
            />
          </Grid>

          <Grid item xl lg sm md xs>
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
              style={{ width: "175px" }}
            />
          </Grid>

          <Grid item xl lg sm md xs>
            <Textfield
              select
              id='lineColor'
              defaultValue='#000000'
              label='Bar Color'
              style={{ width: "175px" }}
            >
              {colors.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Textfield>
          </Grid>
        </Grid>

        <Grid container direction='row' justify='space-around' spacing={2} alignItems='flex-end'>
          <Grid item xl lg sm md xs>
            <Textfield
              select
              id='textAlign'
              defaultValue='center'
              label='Text Alignment'
              style={{ width: "175px" }}
            >
              {alignments.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Textfield>
          </Grid>

          <Grid item xl lg sm md xs>
            <Textfield
              select
              id='textPosition'
              defaultValue='bottom'
              label='Text Position'
              style={{ width: "175px" }}
            >
              {textPositions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Textfield>
          </Grid>

          <Grid item xl lg sm md xs>
            <Textfield
              select
              id='fontOptions'
              defaultValue=' '
              label='Font Style'
              style={{ width: "175px" }}
            >
              {fontStyles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Textfield>
          </Grid>

          <Grid item xl lg sm md xs>
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
            />
          </Grid>

          <Grid item xl lg sm md xs>
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
            />
          </Grid>

          <Grid container direction='row' justify='space-around' spacing={2} alignItems='flex-end'>
            <Grid item xl lg sm md xs>
              <Textfield id='text' label='Text Value' style={{ width: "175px" }} />
            </Grid>

            <Grid item xl lg sm md xs>
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
              />
            </Grid>
          </Grid>

          <Grid container direction='row' justify='space-around' spacing={2} alignItems='flex-end'>
            <div>
              <Barcode {...settings} />
            </div>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default LabelCreator;
