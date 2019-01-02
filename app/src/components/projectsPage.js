import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getAllProjects } from '../actions/projects'
import { withStyles } from '@material-ui/core/styles'
import { 
    Grid,
} from '@material-ui/core'
import ProjectCard from './projectCard'

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        height: 140,
        width: 100,
      },
      control: {
        padding: theme.spacing.unit * 2,
      },
      card: {
        maxWidth: 400,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      actions: {
        display: 'flex',
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: '#f44336',
      },
})

class ProjectDashboard extends Component {
    constructor() {
        super()
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        this.props.getAllProjects()
    }

    render() {
        const { user } = this.props.auth
        const { classes } = this.props
        const { projects } = this.props.projects
        const ProjectList = projects.map((p,i) => {
            return (
                <ProjectCard 
                    key={i}
                    number={p.number}
                    client={p.client}
                    description={p.description}
                />
            )
        }) 

        return (
            <div className="content">
                <Grid container className={classes.root}>
                    {ProjectList}
                </Grid>
            </div>
        )
    }
}

ProjectDashboard.propTypes = {
    apiUrl: PropTypes.object.isRequired,
    getAllProjects: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    apiUrl: state.api,
    auth: state.auth,
    projects: state.projects
})

export default connect(mapStateToProps, { getAllProjects })(withStyles(styles, {withTheme: true})(ProjectDashboard))