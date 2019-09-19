import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGeneratedColors, openPaletteGenerator } from '../../actions';
import './PaletteGenerator.css';
import locked from '../../images/locked.png';
import unlocked from '../../images/unlocked.png';
let ColorScheme = require('color-scheme');


export class PaletteGenerator extends Component {
    constructor() {
        super();
        this.state = {
            color_1: '',
            color_2: '',
            color_3: '',
            color_4: '',
            color_5: '',
            paletteName: '',
            frozen: ['Lock', 'Lock', 'Lock', 'Lock', 'Lock']
        }
    }

    componentDidMount() {
        this.generatePalette();
    }

    generatePalette = () => {
        var hue = Math.floor(Math.random() * 361);
        var scheme = new ColorScheme();
            scheme.from_hue(hue)
            .scheme('tetrade')
            .variation('pastel')
            .web_safe(true);
        var colors = scheme.colors();
        var palette = colors.map(color => '#' + color).slice(10, 15);

        const {frozen, color_1, color_2, color_3, color_4, color_5} = this.state

        this.setState({
            color_1: frozen[0] === 'Locked' ? color_1 : palette[0],
            color_2: frozen[1] === 'Locked' ? color_2 : palette[1],
            color_3: frozen[2] === 'Locked' ? color_3 : palette[2],
            color_4: frozen[3] === 'Locked' ? color_4 : palette[3],
            color_5: frozen[4] === 'Locked' ? color_5 : palette[4]
        });
        this.props.handleSetGeneratedColors(palette);
        
        this.setState({paletteName: this.props.openPaletteGen.paletteUpdatingName})
    }

    handleFrozen = e => {
        const index = parseInt(e.target.id);
        const value = this.state.frozen 
        if (value[index] === 'Lock') {
            value[index] = 'Locked'
        }  else {
            value[index] = 'Lock'
        }
        this.setState({frozen:  value})
    }

    togglePaletteGenerator = () => {
        this.props.handleOpenPaletteGenerator('add', 0)
      }

    handleOnChange = e => {
        this.setState({paletteName: e.target.value});
    }

    submitNewPalette = () => {
        const { paletteName } = this.state
        if(paletteName !== "") {
            this.props.addAndUpdatePalette(paletteName)
            this.props.handleOpenPaletteGenerator()
            this.clearInput()
            this.setState({
                frozen: ['Lock', 'Lock', 'Lock', 'Lock', 'Lock']
            });
        }
    }

    clearInput = () => {
        this.setState({paletteName: ""})
    }

    palleteGenstyle = () => {
        const { open } = this.props.openPaletteGen;
        return open ? {display: 'flex'} : {display: 'none'}
    }

    render() {
        const { frozen } = this.state
        
        return (
            <div className="palette-gen-container" style={this.palleteGenstyle()}>
                <article  className="container" >
                    <section className="color color-1" style={{background: this.state.color_1}}>
                         <img className="lock lock-1" onClick={this.handleFrozen} id="0"  src={frozen[0] === 'Locked' ? locked : unlocked} alt="Lock"/>
                    </section>
                    <section className="color color-2"style={{background: this.state.color_2}}>
                         <img className="lock" onClick={this.handleFrozen} id="1"  src={frozen[1] === 'Locked' ? locked : unlocked} alt="Lock"/>
                    </section>
                    <section className="color color-3" style={{background: this.state.color_3}}>
                         <img className="lock" onClick={this.handleFrozen} id="2"  src={frozen[2] === 'Locked' ? locked : unlocked} alt="Lock"/>
                    </section>
                    <section className="color color-4" style={{background: this.state.color_4}}>
                         <img className="lock" onClick={this.handleFrozen} id="3"  src={frozen[3] === 'Locked' ? locked : unlocked} alt="Lock"/>
                    </section>
                    <section className="color color-5" style={{background: this.state.color_5}}>
                         <img className="lock" onClick={this.handleFrozen} id="4"  src={frozen[4] === 'Locked' ? locked : unlocked} alt="Lock"/>                    
                    </section>
                    <input type="text" maxLength="35" value={this.state.paletteName} className="palette-name-input" placeholder="Palette name" onChange={this.handleOnChange}/>

                    <button className="gen-add-btn generate-btn" onClick={this.generatePalette} >Generate</button>

                    <button className="gen-add-btn add-update-palette-btn" onClick={this.submitNewPalette}
                    >{this.props.openPaletteGen.type}</button>
                    <button className="close-gen-btn" onClick={this.togglePaletteGenerator}
                    >&#xd7;</button>
                </article>
            </div>
                
        )
    }
}

export const mapStateToProps = state => ({
    openPaletteGen: state.openPaletteGen
});

export const mapDispatchToProps = (dispatch) => ({
    handleSetGeneratedColors: (colors) => dispatch(setGeneratedColors(colors)),
    handleOpenPaletteGenerator: (type, id) => dispatch(openPaletteGenerator(type, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaletteGenerator);