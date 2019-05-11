import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import imgApi from 'dan-api/images/photos';
import { ProductCard } from 'dan-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import { connect } from 'react-redux';
import { getHistorialExterno } from '../../actions2/historialexterno';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 700,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  marcar: {
    width: 128,
    height: 128,
  },
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& table': {
      minWidth: 500,
      [theme.breakpoints.down('md')]: {
        '& td': {
          height: 40
        }
      }
    }
  }
});


class ListarHistorialExterno extends React.Component {
  componentDidMount() {
    this.props.getHistorialExterno();
  }

  state = {
    columns: [
      {
        name: 'tramitador',
        options: {
          filter: true
        }
      },
      {
        name: 'alumno',
        options: {
          filter: true,
        }
      },
      {
        name: 'Total Pago',
        options: {
          filter: false,
          customBodyRender: (value) => (
            <LinearProgress variant="determinate" color="secondary" value={value} />
          )
        }
      },
      {
        name: 'A Cuenta',
        options: {
          filter: true,
          customBodyRender: (value) => {
            if (value === 'active') {
              return (<Chip label="Active" color="secondary" />);
            }
            if (value === 'non-active') {
              return (<Chip label="Non Active" color="primary" />);
            }
            return (<Chip label="Unknown" />);
          }
        }
      },
      {
        name: 'Saldo',
        options: {
          filter: true,
          customBodyRender: (value) => {
            const nf = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });

            return nf.format(value);
          }
        }
      },
    ],
    data: []
  }


  render() {
    console.log(this);
    const { columns, data } = this.state;
    const options = {
      filterType: 'dropdown',
      responsive: 'stacked',
      print: true,
      rowsPerPage: 10,
      page: 1
    };
    const { classes } = this.props;
    const title = brand.name + '- Blank Page';
    const description = brand.desc;
    const historiales = this.props.historialext.get('historiales');
    console.log(historiales);
    historiales.map(exp => {
      // console.log([exp.get("vendedor"),exp.get("alumno"),exp.get("totalPago"),exp.get("totalPago") - exp.get("aCuenta"), exp.get("aCuenta")])
      data.push([exp.get('vendedor'), exp.get('alumno'), exp.get('totalPago'), exp.get('totalPago') - exp.get('aCuenta'), exp.get('aCuenta')]);
    });
    return (
      <div className={classes.table}>
        <Helmet>
          <title>ECIBAR - Historial tramitadores</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <MUIDataTable
          title="Historial de tramitadores"
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

ListarHistorialExterno.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  historialext: state.get('historialext')
});
export default connect(
  mapStateToProps,
  { getHistorialExterno }
)(withStyles(styles)(ListarHistorialExterno));
