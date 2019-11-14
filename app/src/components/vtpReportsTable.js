import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rows: this.props.reports,
            page: 0,
            rowsPerPage: 6,
          }
    }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };


  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Serial</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>IP</TableCell>
                    <TableCell>CT1 V</TableCell>
                    <TableCell>CT1 A</TableCell>
                    <TableCell>CT1 C</TableCell>
                    <TableCell>CT2 V</TableCell>
                    <TableCell>CT2 A</TableCell>
                    <TableCell>CT2 C</TableCell>
                    <TableCell>CT3 V</TableCell>
                    <TableCell>CT3 A</TableCell>
                    <TableCell>CT3 C</TableCell>
                    <TableCell>CT4 V</TableCell>
                    <TableCell>CT4 A</TableCell>
                    <TableCell>CT4 C</TableCell>
                    <TableCell>CT5 V</TableCell>
                    <TableCell>CT5 A</TableCell>
                    <TableCell>CT5 C</TableCell>
                    <TableCell>CT6 V</TableCell>
                    <TableCell>CT6 A</TableCell>
                    <TableCell>CT6 C</TableCell>
                    <TableCell>CT7 V</TableCell>
                    <TableCell>CT7 A</TableCell>
                    <TableCell>CT7 C</TableCell>
                    <TableCell>CT8 V</TableCell>
                    <TableCell>CT8 A</TableCell>
                    <TableCell>CT8 C</TableCell>
                    <TableCell>CT9 V</TableCell>
                    <TableCell>CT9 A</TableCell>
                    <TableCell>CT9 C</TableCell>
                    <TableCell>CT10 V</TableCell>
                    <TableCell>CT10 A</TableCell>
                    <TableCell>CT10 C</TableCell>
                    <TableCell>CT11 V</TableCell>
                    <TableCell>CT11 A</TableCell>
                    <TableCell>CT11 C</TableCell>
                    <TableCell>CT12 V</TableCell>
                    <TableCell>CT12 A</TableCell>
                    <TableCell>CT12 C</TableCell>
                    <TableCell>CT13 V</TableCell>
                    <TableCell>CT13 A</TableCell>
                    <TableCell>CT13 C</TableCell>
                    <TableCell>CT14 V</TableCell>
                    <TableCell>CT14 A</TableCell>
                    <TableCell>CT14 C</TableCell>
                    <TableCell>CT15 V</TableCell>
                    <TableCell>CT15 A</TableCell>
                    <TableCell>CT15 C</TableCell>
                    <TableCell>CT16 V</TableCell>
                    <TableCell>CT16 A</TableCell>
                    <TableCell>CT16 C</TableCell>
                    <TableCell>CT17 V</TableCell>
                    <TableCell>CT17 A</TableCell>
                    <TableCell>CT17 C</TableCell>
                    <TableCell>CT18 V</TableCell>
                    <TableCell>CT18 A</TableCell>
                    <TableCell>CT18 C</TableCell>
                    <TableCell>CT19 V</TableCell>
                    <TableCell>CT19 A</TableCell>
                    <TableCell>CT19 C</TableCell>
                    <TableCell>CT20 V</TableCell>
                    <TableCell>CT20 A</TableCell>
                    <TableCell>CT20 C</TableCell>
                    <TableCell>CT21 V</TableCell>
                    <TableCell>CT21 A</TableCell>
                    <TableCell>CT21 C</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.serial}
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.ip}</TableCell>
                  <TableCell>{row.cts[0].voltage}</TableCell>
                  <TableCell>{row.cts[0].current}</TableCell>
                  <TableCell>{row.cts[0].power_1}</TableCell>
                  <TableCell>{row.cts[1].voltage}</TableCell>
                  <TableCell>{row.cts[1].current}</TableCell>
                  <TableCell>{row.cts[1].power_1}</TableCell>
                  <TableCell>{row.cts[2].voltage}</TableCell>
                  <TableCell>{row.cts[2].current}</TableCell>
                  <TableCell>{row.cts[2].power_1}</TableCell>
                  <TableCell>{row.cts[3].voltage}</TableCell>
                  <TableCell>{row.cts[3].current}</TableCell>
                  <TableCell>{row.cts[3].power_1}</TableCell>
                  <TableCell>{row.cts[4].voltage}</TableCell>
                  <TableCell>{row.cts[4].current}</TableCell>
                  <TableCell>{row.cts[4].power_1}</TableCell>
                  <TableCell>{row.cts[5].voltage}</TableCell>
                  <TableCell>{row.cts[5].current}</TableCell>
                  <TableCell>{row.cts[5].power_1}</TableCell>
                  <TableCell>{row.cts[6].voltage}</TableCell>
                  <TableCell>{row.cts[6].current}</TableCell>
                  <TableCell>{row.cts[6].power_1}</TableCell>
                  <TableCell>{row.cts[7].voltage}</TableCell>
                  <TableCell>{row.cts[7].current}</TableCell>
                  <TableCell>{row.cts[7].power_1}</TableCell>
                  <TableCell>{row.cts[8].voltage}</TableCell>
                  <TableCell>{row.cts[8].current}</TableCell>
                  <TableCell>{row.cts[8].power_1}</TableCell>
                  <TableCell>{row.cts[9].voltage}</TableCell>
                  <TableCell>{row.cts[9].current}</TableCell>
                  <TableCell>{row.cts[9].power_1}</TableCell>
                  <TableCell>{row.cts[10].voltage}</TableCell>
                  <TableCell>{row.cts[10].current}</TableCell>
                  <TableCell>{row.cts[10].power_1}</TableCell>
                  <TableCell>{row.cts[11].voltage}</TableCell>
                  <TableCell>{row.cts[11].current}</TableCell>
                  <TableCell>{row.cts[11].power_1}</TableCell>
                  <TableCell>{row.cts[12].voltage}</TableCell>
                  <TableCell>{row.cts[12].current}</TableCell>
                  <TableCell>{row.cts[12].power_1}</TableCell>
                  <TableCell>{row.cts[13].voltage}</TableCell>
                  <TableCell>{row.cts[13].current}</TableCell>
                  <TableCell>{row.cts[13].power_1}</TableCell>
                  <TableCell>{row.cts[14].voltage}</TableCell>
                  <TableCell>{row.cts[14].current}</TableCell>
                  <TableCell>{row.cts[14].power_1}</TableCell>
                  <TableCell>{row.cts[15].voltage}</TableCell>
                  <TableCell>{row.cts[15].current}</TableCell>
                  <TableCell>{row.cts[15].power_1}</TableCell>
                  <TableCell>{row.cts[16].voltage}</TableCell>
                  <TableCell>{row.cts[16].current}</TableCell>
                  <TableCell>{row.cts[16].power_1}</TableCell>
                  <TableCell>{row.cts[17].voltage}</TableCell>
                  <TableCell>{row.cts[17].current}</TableCell>
                  <TableCell>{row.cts[17].power_1}</TableCell>
                  <TableCell>{row.cts[18].voltage}</TableCell>
                  <TableCell>{row.cts[18].current}</TableCell>
                  <TableCell>{row.cts[18].power_1}</TableCell>
                  <TableCell>{row.cts[19].voltage}</TableCell>
                  <TableCell>{row.cts[19].current}</TableCell>
                  <TableCell>{row.cts[19].power_1}</TableCell>
                  <TableCell>{row.cts[20].voltage}</TableCell>
                  <TableCell>{row.cts[20].current}</TableCell>
                  <TableCell>{row.cts[20].power_1}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  reports: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);
