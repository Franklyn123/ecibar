import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { PapperBlock } from "dan-components";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  menu: {
    width: 200
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  img: {
    maxWidth: "none"
  }
});

const image =
  "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";

/**
 *
 */

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

class RENIEC extends React.Component {
  state = {
    NumberFormat: "",
    loading: false,
    error: false,
    success: false,
    dni: "",
    data: {
      preNombres: "",
      apePaterno: "",
      apeMaterno: ""
    },
    images: [
      {
        img: image,
        title: "foto",
        author: "RENIEC"
      },
      {
        img: image,
        title: "firma",
        author: "RENIEC"
      },
      {
        img: image,
        title: "hizquierda",
        author: "RENIEC"
      },
      {
        img: image,
        title: "hderecha",
        author: "RENIEC"
      }
    ]
  };

  fetchCharacters = async dni => {
    this.setState({
      loading: true,
      error: false
    });
    try {
      const response = await fetch(
        `http://api.wsreniec.com/v1/7bc7c2cf36c9a8b703759c3fafe6eeb5/reniec/${dni}`
      );
      const api_rest = await response.json();

      var imagenes = [];
      for (var image in api_rest.images) {
        imagenes.push({
          img: api_rest.images[image],
          title: image,
          author: "RENIEC"
        });
      }

      this.setState({
        loading: false,
        data: api_rest.result,
        images: imagenes
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: true
      });
    }
  };

  handleClick = e => {
    this.fetchCharacters(this.state.numberformat);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    if (this.state.error == true) return <div>Error:</div>;

    const title = "Dandelion Pro. Blank Page";
    const description = "Dandelion Pro";
    const { classes } = this.props;
    const images = this.state.images;

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="" desc="">
          <div className={classes.container}>
            <TextField
              className={classes.formControl}
              label="DNI"
              value={this.state.numberFormat}
              onChange={this.handleChange("numberformat")}
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />

            <Fragment>
              <Grid
                container
                alignItems="center"
                justify="flex-start"
                direction="row"
                spacing={16}
              >
                <Grid item md={6} className={classes.demo}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleClick}
                  >
                    BUSCAR
                  </Button>
                </Grid>
              </Grid>
            </Fragment>
          </div>
          <TextField
            id="outlined-read-only-input"
            label="Nombres"
            value={this.state.data.preNombres}
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-read-only-input"
            label="Apellido Paterno"
            value={this.state.data.apePaterno}
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-read-only-input"
            label="Apellido Materno"
            value={this.state.data.apeMaterno}
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
              {images.map((tile, index) => (
                <GridListTile key={index.toString()}>
                  <img
                    src={`data:image/jpeg;base64,${tile.img}`}
                    alt={tile.title}
                    className={classes.img}
                  />
                  <GridListTileBar
                    title={tile.title}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title
                    }}
                    actionIcon={
                      <IconButton>
                        <StarBorderIcon className={classes.title} />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
            {this.state.loading && <div>Loading..</div>}
          </div>
        </PapperBlock>
      </div>
    );
  }
}

RENIEC.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RENIEC);
