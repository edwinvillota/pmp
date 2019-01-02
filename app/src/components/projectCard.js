import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { 
    Grid,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
} from '@material-ui/core'

const styles = theme => ({
    card: {
        maxWidth: 400,
        marginBottom: '20px'
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
        this.state = {}
    }

    render() {
        const { 
            classes,
            number,
            client,
            description
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
                        title={number}
                        subheader={client}
                    />
                    <CardContent>
                        <Typography component='p'>
                            {description}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

ProjectCard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProjectCard)