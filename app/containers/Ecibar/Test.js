import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getItems, deleteItem } from '../../actions2/itemActions';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
// export const AppContext = React.createContext();
class Test extends React.Component {
  /* constructor(props) {
    super(props);
  } */
  componentDidMount() {
    // console.log("in")
    // console.log(this);
    this.props.getItems();
  }

 

  /* constructor(props) {
    console.log("IN")
    console.log(props);
    super(props);
    this.state = {
      item: []
    };
  } */
  render() {
    const { classes } = this.props;
    console.log(classes);
    // console.log("in test")
    // console.log(this);
    // console.log(this.props.item.get("items"));
    const items = this.props.item.get('items');

    // console.log("out test");
    console.log(items);

    const title = 'ECIBAR S.A.C.. Blank Page';
    const description = 'ECIBAR S.A.C.';
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
        <PapperBlock title="Stripped Table" whiteBg icon="ios-menu-outline" desc="gg">
          <div>
            <Paper className="TEST">
              <Toolbar>
                <div className="TITLE TEST">
                  <Typography variant="h6">Nutrition of the Good</Typography>
                </div>
              </Toolbar>
              <Table className="TABLE TEST">
                <TableHead>
                  <TableRow>
                    <TableCell padding="dense">Dessert (100g serving)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map(n => ([
                    <TableRow key={n.get('name')}>
                      <TableCell padding="dense">{n.get('name')}</TableCell>
                    </TableRow>
                  ]))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </PapperBlock>
      </div>
    );
  }
}

// console.log(Test.propTypes);
Test.propTypes = {
  getItems: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};
// console.log(state);
const mapStateToProps = state => ({
  item: state.get('item')
});
// export default Test;
export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(Test);
