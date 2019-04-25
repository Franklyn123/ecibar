
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  fetchAction,
  addAction,
  removeAction,
  updateAction,
  editAction,
  saveAction,
  closeNotifAction,
} from 'dan-actions/CrudTbActions';
import { CrudTable, Notification } from 'dan-components';
import styles from 'dan-components/Tables/tableStyle-jss';
import { getInstructores } from '../../actions2/instructores';

// Reducer Branch
const branch = 'crudTableDemo';

const anchorTable = [
  {
    name: 'id',
    label: 'Id',
    type: 'static',
    initialValue: '',
    hidden: true
  }, {
    name: 'category',
    label: 'Category',
    type: 'selection',
    initialValue: 'Electronics',
    options: ['Electronics', 'Sporting Goods', 'Apparels', 'Other'],
    width: 'auto',
    hidden: false
  }, {
    name: 'price',
    label: 'Price',
    type: 'number',
    initialValue: 0,
    width: '100',
    hidden: false
  }, {
    name: 'date',
    label: 'Date Updated',
    type: 'date',
    initialValue: new Date(),
    width: 'auto',
    hidden: false
  }, {
    name: 'time',
    label: 'Time Updated',
    type: 'time',
    initialValue: new Date(),
    width: 'auto',
    hidden: false
  }, {
    name: 'name',
    label: 'Name',
    type: 'text',
    initialValue: '',
    width: 'auto',
    hidden: false
  }, {
    name: 'available',
    label: 'Available',
    type: 'toggle',
    initialValue: true,
    width: '100',
    hidden: false
  }, {
    name: 'edited',
    label: '',
    type: 'static',
    initialValue: '',
    hidden: true
  }, {
    name: 'action',
    label: 'Action',
    type: 'static',
    initialValue: '',
    hidden: false
  },
];
const dataApi = [
  {
    id: 1,
    category: 'Sporting Goods',
    price: '49.99',
    date: '4/3/2018',
    time: 'Tue Apr 03 2018 00:00:00 GMT+0700 (WIB)',
    name: 'football',
    available: true,
    edited: false,
  },
];

let fetchResult = [];
class Instructores extends Component {
  async componentDidMount() {
    const props = { ...this.props };
    await props.getInstructores();
  }

  render() {
    const props = { ...this.props };
    const {
      classes,
      // fetchData,
      addEmptyRow,
      dataTable,
      removeRow,
      updateRow,
      editRow,
      finishEditRow,
      closeNotif,
      messageNotif,
    } = this.props;
    fetchResult = props.instructores.get('instructores');
    // const fetchArray = !fetchResult ? dataApi : fetchResult;
    console.log(fetchResult);
    return (
      <div>
        <Notification close={() => closeNotif(branch)} message={messageNotif} />
        <div className={classes.rootTable}>

          {fetchResult && (
            <CrudTable
              dataInit={dataApi}
              anchor={anchorTable}
              title="Inventory Data"
              dataTable={dataTable}
              fetchData={getInstructores}
              addEmptyRow={addEmptyRow}
              removeRow={removeRow}
              updateRow={updateRow}
              editRow={editRow}
              finishEditRow={finishEditRow}
              branch={branch}
            />
          ) }

        </div>
      </div>
    );
  }
}

Instructores.propTypes = {
  classes: PropTypes.object.isRequired,
  // fetchData: PropTypes.func.isRequired,
  dataTable: PropTypes.object.isRequired,
  addEmptyRow: PropTypes.func.isRequired,
  removeRow: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
  editRow: PropTypes.func.isRequired,
  finishEditRow: PropTypes.func.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  force: state, // force state from reducer
  dataTable: state.getIn([branch, 'dataTable']),
  messageNotif: state.getIn([branch, 'notifMsg']),
  historialext: state.get('historialext'),
  instructores: state.get('instructores')
});

const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
  addEmptyRow: bindActionCreators(addAction, dispatch),
  removeRow: bindActionCreators(removeAction, dispatch),
  updateRow: bindActionCreators(updateAction, dispatch),
  editRow: bindActionCreators(editAction, dispatch),
  finishEditRow: bindActionCreators(saveAction, dispatch),
  closeNotif: bindActionCreators(closeNotifAction, dispatch),
  getInstructores: bindActionCreators(getInstructores, dispatch),

});

const InstructoresCrudTableMapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Instructores);

export default withStyles(styles)(InstructoresCrudTableMapped);
