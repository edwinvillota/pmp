import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { 
    Grid,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    Collapse,
} from '@material-ui/core'
import {
    Delete,
    Dashboard,
    ExpandMore,
    Edit
} from '@material-ui/icons'

const styles = theme => ({
    card: {
        maxWidth: 400,
        marginBottom: '20px',
        cursor: 'pointer',
        transition: 'all .2s ease-in-out',
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

class ProjectCard extends Component {
    constructor() {
        super()
        this.state = {
            expanded: false
        }
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }))
    }

    render() {
        const { 
            classes,
            project
        } = this.props

        return (
            <Grid item xs={4}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                            CT
                            </Avatar>
                        }
                        title={project.number}
                        subheader={project.client}
                    />
                    <CardContent>
                        <Typography component='p' align='justify'>
                            {project.object}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label='Ver'>
                            <Dashboard />
                        </IconButton>
                        <IconButton aria-label='Editar'>
                            <Edit />
                        </IconButton>
                        <IconButton aria-label='Eliminar'>
                            <Delete />
                        </IconButton>
                        <IconButton 
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Ver mas"
                            >
                            <ExpandMore />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography variant='subtitle2'>MUNICIPIOS</Typography>
                            {project.place.map((m, i) => {
                                return (
                                    <Typography key={i}>{m.name}</Typography>
                                )
                            })}
                            <br></br>
                            <Typography variant='subtitle2'>INTERVENTORES</Typography>
                            {project.interventors.map((it, i) => {
                                return (
                                    <Typography key={i}>{it.name}</Typography>
                                )
                            })}
                            <br></br>
                            <Typography variant='subtitle2'>PRESUPUESTO</Typography>
                            {project.budget.map((b, i) => {
                                return (
                                    <Typography key={i}>{`${b.name}:    $ ${b.value.toLocaleString()}`}</Typography>
                                )
                            })}
                            <br></br>
                            <Typography variant='subtitle2'>FECHAS</Typography>
                            {project.dates.map((d, i) => {
                                return (
                                    <Typography key={i}>{`${d.description}:    ${d.date}`}</Typography>
                                )
                            })}
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        )
    }
}

ProjectCard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProjectCard)