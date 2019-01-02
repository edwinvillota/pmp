import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authentication'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import FolderIcon from '@material-ui/icons/Folder'


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'black',
    color: 'white'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    subMenus : {
      tools : false
    }
  }

  componentDidMount() {
    const { isAuthenticated } = this.props.auth
    if (!isAuthenticated) {
      this.props.history.push('/login')
    }
  }

  onLogout(e) {
    e.preventDefault()
    this.props.logoutUser(this.props.history)
  }

  handleToolsExpand = () => {
    this.setState({ subMenus : {
      tools : !this.state.subMenus.tools
    } })
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth
    const { classes, theme } = this.props

    let autenticatedLinks = (
      <List>
        <ListItem>
          <ListItemIcon><PersonIcon></PersonIcon></ListItemIcon>
          <ListItemText>{user.name}</ListItemText>
        </ListItem>
        <ListItem button onClick={this.handleToolsExpand}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText inset primary="Herramientas" />
          {this.state.subMenus.tools ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.subMenus.tools} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link className="nav-link" to="/tools/boxState">
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Estado de Caja" />
              </ListItem>
            </Link>
            <Link className="nav-link" to="/tools/updateCSV">
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Actualizar CSV" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
        <Link className="nav-link" to="/projects">
          <ListItem button key='Login'>
            <ListItemIcon><FolderIcon></FolderIcon></ListItemIcon>
            <ListItemText>Contratos</ListItemText>
          </ListItem>
        </Link>
      </List>
    )

    let loginLink = (
      <Link className="nav-link" to="/login">
        <ListItem button key='Login'>
          <ListItemIcon><PersonIcon></PersonIcon></ListItemIcon>
          <ListItemText>Login</ListItemText>
        </ListItem>
      </Link>
    )

    let logoutLink = (
      <Link className="nav-link" to="/login">
        <ListItem button onClick={this.onLogout.bind(this)}>
          <ListItemIcon><ExitToAppIcon/></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </Link>
    )

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Project Management Platform
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {isAuthenticated ? autenticatedLinks : null}
            {!isAuthenticated ? loginLink : logoutLink}
          </List>
        </Drawer>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  logoutUser:  PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps, { logoutUser })(MiniDrawer)))
