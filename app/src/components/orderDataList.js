import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography,
    Chip,
    Divider
} from '@material-ui/core/'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15)
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15)
    },
    details: {
        alignItems: 'center'
    },
    column: {
        flexBasis: '50%'
    }
})

class OrderDataList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {orders} = this.props
        const orderItems = orders.map((order, i) => {
            return (
                <OrderData order={order.data} key={i} classes={this.props.classes}/>
            )
        })        
        return (
            <ol>
                {orderItems}
            </ol>
        )
    }
}

class OrderData extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { order, classes } = this.props
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                >   
                    <div className={classes.column}>
                        <Typography className={classes.heading}>{`Orden: ${order[1]['Nro Orden']}`}</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>{`Código: ${order[1]['Codigo Interno']}`}</Typography>
                    </div>
                </ExpansionPanelSummary>
                <Divider/>
                <ExpansionPanelDetails>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>
                            Información de Orden
                        </Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography variant='subheading'>Información Básica</Typography>
                        <Typography variant='caption'>{`Fecha de Ejecución: ${order[1]['Fecha Ejecucion']}`}</Typography>
                        <Typography variant='caption'>{`Técnico: ${order[12]['Nombre']}`}</Typography>
                        <Typography variant='caption'>{`Cédula: ${order[12]['Cedula']}`}</Typography>
                        {(order[3]['Medida Centralizada'] === 'SI') && <Typography variant='caption'>{`Medida Centralizada: ${order[3]['Medida Centralizada']}`}</Typography>}
                        {(order[3]['Medida Inteligente'] === 'SI') && <Typography variant='caption'>{`Medida Inteligente: ${order[3]['Medida Inteligente']}`}</Typography>}
                        <Divider/>
                        <Typography variant='subheading'>Actividades Ejecutadas</Typography>
                        {(order[10]['Normalizacion Medidor'] === 'SI') && <Typography variant='caption'>{`Normalizacion Medidor: ${order[10]['Normalizacion Medidor']}`}</Typography>}
                        {(order[10]['Normalizacion Acometida'] === 'SI') && <Typography variant='caption'>{`Normalizacion Acometida: ${order[10]['Normalizacion Acometida']}`}</Typography>}
                        <Divider/>
                        <Typography variant='subheading'>Material Utilizado</Typography>
                        <Divider/>
                        <Typography variant='subheading'>Información de Actualización</Typography>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default withStyles(styles)(OrderDataList)