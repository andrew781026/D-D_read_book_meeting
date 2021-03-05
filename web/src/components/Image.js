import React from 'react';

class Image extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            src: props.src,
            errored: false,
        };
    }

    onError = () => {
        if (!this.state.errored) {
            this.setState({
                src: this.props.fallbackSrc,
                errored: true,
            });
        }
    }

    render() {
        const {src} = this.state;
        const {
            src: _1,          // 不會使用到
            fallbackSrc,
            ...props
        } = this.props;

        return (
            <img
                src={src || fallbackSrc}
                onError={this.onError}
                {...props}
            />
        );
    }
}

export default Image;
