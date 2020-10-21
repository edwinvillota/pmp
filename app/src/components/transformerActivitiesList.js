import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { 
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core'
import {
    getAllTransformersActivities,
    getAllUsers,
    delTransformerActivity,
    assignTransformerActivity,
    breakfreeTransformerActivity
} from '../actions/transformerActivities'
import moment from 'moment'

const styles = theme => ({
    activity__mainwrapper: {
        boxShadow: '3px 3px 3px rgba(0,0,0,.25)',
        backgroundColor: 'white',
        marginBottom: '1em',
        height: '200px',
        padding: '1em'
    },
    activity__maininfo: {
        backgroundColor: '#0D3D51',
        borderRadius: '3px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    maininfo__structure: {
        color: 'white'
    },
    maininfo__town: {
        color: 'white'
    },
    maininfo__creationdate: {
        color: 'white'
    },
    activity__secinfo: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '1em',
        justifyContent: 'space-between',
        borderRight: 'solid 1px #B7B7B7',
        overflow: 'hidden'
    },
    secinfo__propname: {
        color: '#333',
        fontWeight: 'bold',
        width: '50%'
    },
    secinfo__propvalue: {
        width: '50%',
        overflow: 'hidden'
    },
    activity__buttonwrap: {
        display: 'flex',
        flexDirection: 'row',
        height: '40px',
    },
    activity__inputwrap: {
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '1em'
    },
    button__asign_to: {
        backgroundColor: '#A3BC90',
        height: '40px',
        color: 'white'
    },
    button__breakfree: {
        backgroundColor: '#FEC704',
        marginRight: '1em',
        color: 'white'
    },
    button__delete: {
        backgroundColor: '#E87878',
        color: 'white'
    }
})

class TransformersActivitiesLists extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dialogs: {
                remove: false,
                asign: false,
                breakfree: false
            },
            activity_id: '',
            activities_users: []
        }
        
    }

    componentDidMount () {
        this.props.getAllTransformersActivities()
        this.props.getAllUsers()
    }

    handleOpenRemoveDialog = (activity_id) => {
        this.setState({
            dialogs: {
                ...this.state.dialogs,
                remove: true
            },
            activity_id: activity_id
        })
    }

    handleDeleteActivity = () => {
        const { activity_id } = this.state
        this.props.delTransformerActivity(activity_id)

        this.handleCloseRemoveDialog()

        window.location.reload()
    }

    handleCloseRemoveDialog = () => {
        this.setState({
            dialogs: {
                ...this.state.dialogs,
                remove: false
            }
        })
    }


    handleOpenAsignDialog = (activity_id) => {
        // Find asign user
        const { activities_users } = this.state

        const asignRecord = activities_users.find(a => a.activity_id === activity_id)

        if (asignRecord) {
            this.setState({
                dialogs: {
                    ...this.state.dialogs,
                    asign: true
                },
                activity_id: activity_id
            })
        } else {
            console.log('No se encontro el registro')
        }

    }

    handleCloseAsignDialog = () => {
        this.setState({
            dialogs: {
                ...this.state.dialogs,
                asign: false
            }
        })
    }

    handleAsignActivity = () => {
        const { activity_id, activities_users } = this.state


        const activityRecord = activities_users.find(a => a.activity_id === activity_id)

        this.props.assignTransformerActivity(activityRecord.activity_id, activityRecord.user_id)
    }

    handleChangeActivityUser = activity_id => e => {
        const { activities_users } = this.state
    
        // Validate activity existence 

        const existsActivity = activities_users.find(a => a.activity_id === activity_id)

        if (existsActivity) {
            const newActivitiesUsers = activities_users.map(a => {
                if (a.activity_id === activity_id) {
                    a.user_id = e.target.value
                }
                return a
            })

            this.setState({
                activities_users: newActivitiesUsers
            })
        } else {
            this.setState({
                activities_users: [
                    ...this.state.activities_users,
                    {activity_id: activity_id, user_id: e.target.value}
                ]
            })
        }
    }

    handleOpenBreakfreeDialog = (activity_id) => {
        this.setState({
            dialogs: {
                ...this.state.dialogs,
                breakfree: true
            },
            activity_id: activity_id
        })
    }

    handleBreakfreeActivity = () => {
        const {activity_id} = this.state
        this.props.breakfreeTransformerActivity(activity_id)
    } 

    handleCloseBreakfreeDialog = (activity_id) => {
        this.setState({
            dialogs: {
                ...this.state.dialogs,
                breakfree: false
            }
        })   
    }

    _renderUsersOptions () {
        const { users } = this.props.transformerActivities

        const options = users.map((u, i) => (
            <option key={i} value={u._id}>{`${u.name} ${u.lastname}`}</option>
        ))

        return options
    }

    _renderActivities () {
        const { classes } = this.props
        const activities = this.props.transformerActivities.activities

        const items = activities.map((activity, i) => {
            return (
                <Grid container spacing={24} key={i} className={classes.activity__mainwrapper}>
                    <Grid container xs={6}>
                        <Grid item xs={6} className={classes.activity__maininfo}>
                            <Typography 
                                variant='h5'
                                className={classes.maininfo__structure}
                                >
                                {activity.transformer_info[0].structure}
                            </Typography>
                            <Typography
                                variant='body2'
                                className={classes.maininfo__creationdate}
                                >
                                {moment(activity.creation_date).format('YYYY-MM-DD hh:mm a')}
                            </Typography>
                            <Typography
                                variant='body1'
                                className={classes.maininfo__town}
                                >
                                {activity.transformer_info[0].town}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.activity__secinfo}>
                            <Typography
                                className={classes.secinfo__propname}
                            >
                                Tipo
                            </Typography>
                            <Typography
                                className={classes.secinfo__propvalue}
                            >
                                {activity.type}
                            </Typography>
                            <Typography
                                className={classes.secinfo__propname}
                            >
                                Estado
                            </Typography>
                            <Typography
                                className={classes.secinfo__propvalue}
                            >
                                {activity.status}
                            </Typography>
                            <Typography
                                className={classes.secinfo__propname}
                            >
                                Propietario
                            </Typography>
                            <Typography
                                className={classes.secinfo__propvalue}
                            >
                                {activity.creator}
                            </Typography>
                            <Typography
                                className={classes.secinfo__propname}
                            >
                                Asignado
                            </Typography>
                            <Typography
                                className={classes.secinfo__propvalue}
                            >
                                {
                                    (activity.user_info[0]) ? 
                                    (`${activity.user_info[0].name} ${activity.user_info[0].lastname}`) :
                                    ('NO ASIGNADO')
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container xs={6} style={{paddingLeft: '1em'}}>
                        <Grid container xs={12} className={classes.activity__inputwrap}>
                            <Grid item xs={3}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    className={classes.button__asign_to}
                                    disabled={!!activity.asigned_to}
                                    onClick={() => this.handleOpenAsignDialog(activity._id)}
                                    >
                                    Asignar
                                </Button>
                            </Grid>
                            <Grid item xs={9} style={{paddingLeft: '1em'}}>
                                <FormControl variant='outlined' fullWidth disabled={!!activity.asigned_to}>
                                    <InputLabel
                                        style={{backgroundColor: 'white'}}
                                        >
                                        Usuario
                                    </InputLabel>
                                    <Select
                                        native
                                        style={{height: '40px'}}
                                        input={
                                            <OutlinedInput
                                                labelWidth={50}
                                                name='Usuario'
                                            />
                                        }
                                        onChange={this.handleChangeActivityUser(activity._id)}
                                    >   
                                        <option value={''}></option>
                                        {this._renderUsersOptions()}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid xs={12} className={classes.activity__buttonwrap}>
                            <Button
                                variant='contained'
                                fullWidth
                                className={classes.button__breakfree}
                                disabled={!activity.asigned_to}
                                onClick={
                                    () => {
                                        this.handleOpenBreakfreeDialog(activity._id)
                                    }
                                }
                                >
                                Liberar
                            </Button>
                            <Button
                                variant='contained'
                                fullWidth
                                className={classes.button__delete}
                                onClick={
                                    () => {
                                        this.handleOpenRemoveDialog(activity._id)
                                    }
                                }
                                >
                                Eliminar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            )
        })

        return items
    }

    render () {
        const { classes } = this.props
        return (
            <Grid container spacing={24} style={{padding: '1em'}}>
                <Dialog
                    open={this.state.dialogs.remove}
                    >
                    <DialogTitle>
                        Confirmación
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Esta seguro de que desea eliminar la actividad?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary'
                            onClick={this.handleDeleteActivity}
                            >
                            OK
                        </Button>
                        <Button color='primary'
                            onClick={this.handleCloseRemoveDialog}
                            >
                            CANCELAR
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.dialogs.asign}
                    >
                    <DialogTitle>
                        Confirmación
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Esta seguro de que desea asignar la actividad?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary'
                            onClick={this.handleAsignActivity}
                            >
                            OK
                        </Button>
                        <Button color='primary'
                            onClick={this.handleCloseAsignDialog}
                            >
                            CANCELAR
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.dialogs.breakfree}
                    >
                    <DialogTitle>
                        Confirmación
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Esta seguro de que desea liberar la actividad?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary'
                            onClick={this.handleBreakfreeActivity}
                            >
                            OK
                        </Button>
                        <Button color='primary'
                            onClick={this.handleCloseBreakfreeDialog}
                            >
                            CANCELAR
                        </Button>
                    </DialogActions>
                </Dialog>
                {this._renderActivities()}
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    apiUrl: state.api.apiUrl,
    transformerActivities: state.transformerActivities
})

const mapDispatchToProps = dispatch => ({
    getAllTransformersActivities: () => {
        dispatch(getAllTransformersActivities())
    },
    getAllUsers: () => {
        dispatch(getAllUsers())
    },
    delTransformerActivity: (activity_id) => {
        dispatch(delTransformerActivity(activity_id))
    },
    assignTransformerActivity: (activity_id, user_id) => {
        dispatch(assignTransformerActivity(activity_id, user_id))
    },
    breakfreeTransformerActivity: (activity_id) => {
        dispatch(breakfreeTransformerActivity(activity_id))
    }
})

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps,mapDispatchToProps)(TransformersActivitiesLists))