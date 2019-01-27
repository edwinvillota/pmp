import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import AddIcon from '@material-ui/icons/Add'
import {
    Grid,
    // Typography,
    Button,
    TextField,
    Chip,
    Avatar
    
} from '@material-ui/core'

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    chip: {
      margin: theme.spacing.unit,
    },
    hide: {
        display: 'none'
    }
})

class InterventorChip extends Component {
    constructor() {
        super ()
    }
    render() {
        const { 
            interventor,
            classes,
            handleDelete
        } = this.props
        return(
            <Chip
                avatar={<Avatar>{interventor.nombre.charAt(0)}</Avatar>}
                label={interventor.nombre}
                className={classes.chip}
                onDelete={handleDelete}
            ></Chip>
        )
    }
}


class InterventorsList extends Component {
    constructor() {
        super()
        this.state = {
            newInterventor: {
                nombre: '',
                cargo: '',
                telefono: 0,
                descripcion: ''
            },
            interventors: [],
            addCompVisibility: true
        }
    }

    handleChangeInfo = prop => event => {
        let newData = this.state.newInterventor
        newData[prop] = event.target.value
        this.setState({
            newInterventor: newData
        })
    }

    handleAddInterventor = (e) => {
        e.preventDefault()
        let newInterventors = this.state.interventors
        let addCompVisibility
        newInterventors.push(this.state.newInterventor)
        if (newInterventors.length >= this.props.maxItems) {
            addCompVisibility = false
        } else {
            addCompVisibility = true
        }
        this.setState({
            interventors: newInterventors,
            newInterventor: {
                nombre: '',
                cargo: '',
                telefono: '',
                descripcion: ''
            },
            addCompVisibility: addCompVisibility
        })
    }

    handleDeleteInterventor = i => event => {
        event.preventDefault()
        let newInterventors = this.state.interventors.filter(int => int !== i)
        let addCompVisibility
        if (newInterventors.length < this.props.maxItems) {
            addCompVisibility = true
        } else {
            addCompVisibility = false
        }
        this.setState({
            interventors: newInterventors,
            addCompVisibility: addCompVisibility
        })
    }

    render() {
        const { classes } = this.props
        const { 
            newInterventor,
            interventors,
            addCompVisibility
         } = this.state
        const intCards = interventors.map((i, index) => {
            return(
                <InterventorChip 
                    interventor={i} 
                    classes={classes}
                    handleDelete={this.handleDeleteInterventor(i)}
                />
            )
        })

        return ( 
            <Grid container>
                <Grid item xs={12}>
                    {intCards}
                    <Button variant="contained" color="primary" className={classNames({
                        [classes.button]: true,
                        [classes.hide]: !addCompVisibility
                    })}
                    onClick={this.handleAddInterventor}
                    >
                        Agregar
                        <AddIcon className={classes.rightIcon}/>
                    </Button>
                </Grid>
                <Grid item xs={3} className={addCompVisibility ? '' : classes.hide}>
                    <TextField 
                        label='Nombre'
                        className={classes.textField}
                        margin='normal'
                        value={newInterventor.nombre}
                        onChange={this.handleChangeInfo('nombre')}
                    />
                </Grid>
                <Grid item xs={3} className={addCompVisibility ? '' : classes.hide}>
                    <TextField 
                        label='Cargo'
                        className={classes.textField}
                        margin='normal'
                        value={newInterventor.cargo}
                        onChange={this.handleChangeInfo('cargo')}
                    />
                </Grid>
                <Grid item xs={3} className={addCompVisibility ? '' : classes.hide}>
                    <TextField 
                        type='number'
                        label='Teléfono'
                        className={classes.textField}
                        margin='normal'
                        value={newInterventor.telefono}
                        onChange={this.handleChangeInfo('telefono')}
                    />
                </Grid>
                <Grid item xs={3} className={addCompVisibility ? '' : classes.hide}>
                    <TextField 
                        label='Descripción'
                        className={classes.textField}
                        margin='normal'
                        value={newInterventor.descripcion}
                        onChange={this.handleChangeInfo('descripcion')}
                    />
                </Grid>
            </Grid>
        )
    }
}

InterventorsList.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    apiUrl: state.api
})

export default withStyles(styles)(connect(mapStateToProps)(InterventorsList))