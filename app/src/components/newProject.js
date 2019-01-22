import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
    Grid,
    Paper,
    Typography,
    FormControl,
    TextField,
    //FormGroup,
    FormLabel,
    //FormControlLabel,
    Select,
    OutlinedInput,
    InputLabel,
    Divider
} from '@material-ui/core'
import InterventorList from './interventorList'


const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      width: '100%'
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: '90%'
    },
});

class NewProject extends Component {
    constructor(){
        super()
        this.state = {
            visibility: true
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div className="content">
                <Grid container className={classes.root}>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant='h5' component='h3' align='center'>CREAR PROYECTO</Typography><br></br>
                        <Grid item xs={12}>
                            <form className={classes.form} autoComplete='off'>
                                <Grid item xs={12}>
                                    <FormLabel component='legend' className={classes.root}>Información del Contrato</FormLabel>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        required
                                        id='project_number'
                                        label='Número'
                                        className={classes.textField}
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl variant='outlined'>
                                        <InputLabel>
                                            Cliente
                                        </InputLabel>
                                        <Select
                                            native
                                            input={
                                                <OutlinedInput
                                                    name='Cliente'
                                                    labelWidth={50}
                                                />
                                            }
                                        >
                                            <option></option>
                                            <option value={1}>CEDENAR S.A E.S.P</option>
                                            <option value={2}>ENERGETICA DE OCCIDENTE</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        required
                                        id='project_object'
                                        label='Objecto'
                                        className={classes.textField}
                                        variant='outlined'
                                    />
                                </Grid>
                                <Divider/>
                                <Grid item xs={12}>
                                    <FormLabel component='legend' className={classes.root}>Interventores</FormLabel>
                                </Grid>
                                <Grid item xs={12}>
                                    <InterventorList maxItems={3}/>
                                </Grid>
                            </form>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        )
    }
}

NewProject.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    apiUrl: state.api
})


export default withStyles(styles)(connect(mapStateToProps)(NewProject))
