import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { getAllProjects } from '../actions/projects'
import { withStyles } from '@material-ui/core/styles'
import { 
    Grid,
    Button
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import ProjectCard from './projectCard'

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 7,
        right: theme.spacing.unit * 10,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
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
        const { classes } = this.props
        const { projects } = this.props.projects
        const ProjectList = projects.map((p,i) => {
            return (
                <ProjectCard 
                    key={i}
                    project={p}
                />
            )
        }) 

        return (
            <div className="content">
                <Grid container className={classes.root}>
                    {ProjectList}
                    <Link to='/projects/new'>
                        <Button variant='fab' aria-label='Add' className={classes.fab} color='secondary'>
                            <Add />
                        </Button>
                    </Link>
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
    apiUrl: state.api.apiUrl,
    auth: state.auth,
    projects: state.projects
})

export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps, { getAllProjects })(ProjectDashboard)))
