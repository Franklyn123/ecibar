import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';

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

  componentDidMount() {
    const props = { ...this.props };
    props.getHistorialExterno();
    const loguedUsername = localStorage.getItem('username');
    if (!loguedUsername) {
      window.location.href = '/login';
    } else if (loguedUsername !== 'octavio') {
      window.location.href = '/not-found';
    }
  }

  render() {
    const props = { ...this.props };
    const { columns, data } = this.state;
    const options = {
      filterType: 'dropdown',
      responsive: 'stacked',
      print: true,
      rowsPerPage: 10,
      page: 1
    };
    const title = brand.name + '- Blank Page';
    const description = brand.desc;
    const historiales = props.historialext.get('historiales');

    historiales.map(exp => data.push([exp.get('vendedor'), exp.get('alumno'), exp.get('totalPago'), exp.get('totalPago') - exp.get('aCuenta'), exp.get('aCuenta')])
    );
    return (
      <div className={props.classes.table}>
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

const mapStateToProps = state => ({
  historialext: state.get('historialext')
});
export default connect(
  mapStateToProps,
  { getHistorialExterno }
)(withStyles(styles)(ListarHistorialExterno));
