import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

const message = {
    color: 'red',
};

class ErrorBoundary extends React.Component<any, any> {
    public state = {
        error: null as any,
        errorInfo: null as any,
    };

    public componentDidCatch(error: any, errorInfo: any) {
        this.setState({ error, errorInfo });
    }

    public render() {
        const { errorInfo } = this.state;
        if (!errorInfo) {
            return this.props.children;
        }

        return (
            <div>
                <Typography variant="h5" style={message}>
                    Something went wrong.
                </Typography>
                <details style={{ whiteSpace: 'pre-wrap' }}>
                    <Paper>
                        <br />
                        <Typography variant="subtitle1">{this.state.error && this.state.error.toString()}</Typography>
                        <Typography variant="body2">{this.state.errorInfo.componentStack}</Typography>
                    </Paper>
                </details>
            </div>
        );
    }
}
export default ErrorBoundary;
