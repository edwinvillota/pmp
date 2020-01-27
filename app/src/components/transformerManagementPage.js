import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import {
    Grid,
    Typography,
    IconButton,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    Avatar,
} from '@material-ui/core'
import {
    getAllTransformers,
    deleteTransformerRecord
} from '../actions/balances'
import { FlashOn, Delete } from '@material-ui/icons'

const styles = theme => ({
    listRow: {
        borderBottom: '1px solid #C6C6C6',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#C6C6C6'
        }
    }
})

class TransformerManagement extends Component {
    constructor (props) {
        super (props)
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getAllTransformers()
    }

    _renderListItems = () => {
        const { classes } = this.props
        const { transformers } = this.props.balances

        return transformers.map((t, i) => (
            <ListItem key={i} className={classes.listRow}>
                <ListItemAvatar>
                    <Avatar>
                        <FlashOn />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={t.structure}
                    secondary={t.town}
                    />
                <ListItemSecondaryAction>
                    <IconButton aria-label='Delete'
                        onClick={() => {this.props.deleteTransformerRecord(t._id)}}
                        >
                        <Delete />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ))
    }

    render () {
        const { classes } = this.props

        return (
            <div className='content'>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant='h5' component='h3' align='center'
                            style={{
                                marginBottom: '1em'
                            }}
                            >
                            ADMINISTRAR TRANSFORMADORES
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <List>
                            {this._renderListItems()}
                        </List>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    apiUrl: state.api.apiUrl,
    balances: state.balances
})

const mapDispatchToProps = dispatch => ({
    getAllTransformers: () => {
        dispatch(getAllTransformers())
    },
    deleteTransformerRecord: (t_id) => {
        dispatch(deleteTransformerRecord(t_id))
    }
})

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(TransformerManagement))