const keymage = require('keymage');
const React = require('react');
const commands = require('../commands');

class Menubar extends React.Component {
  constructor(props) {
    super(props);
    this.menu = [
      {
        name: 'File',
        items: [
          {
            name: 'Exit'
          }
        ]
      },
      {
        name: 'Playback',
        items: [
          {
            name: 'Rewind to start',
            action: 'rewindToStart',
            defaultKeybind: 'shift-h',
            invoke: () => commands.jumpToFrame(0)
          },
          {
            name: 'Rewind one beat',
            action: 'rewindOneBeat',
            defaultKeybind: 'j',
            invoke: () => commands.quantizedJog(0, -1)

          },
          {
            name: 'Forward one beat',
            action: 'forwardOneBeat',
            defaultKeybind: 'k',
            invoke: () => commands.quantizedJog(0, 1)
          },
          {
            name: 'Rewind one bar',
            action: 'rewindOneBar',
            defaultKeybind: 'h',
            invoke: () => commands.quantizedJog(-1)
          },
          {
            name: 'Forward one bar',
            action: 'forwardOneBar',
            defaultKeybind: 'l',
            invoke: () => commands.quantizedJog(1)
          },
          {
            name: 'Rewind one frame',
            action: 'rewindOneFrame',
            defaultKeybind: 'shift-j',
            invoke: () => commands.jog(-1)
          },
          {
            name: 'Forward one frame',
            action: 'forwardOneFrame',
            defaultKeybind: 'shift-k',
            invoke: () => commands.jog(1)
          },
          {
            name: '-'
          },
          {
            name: '0.25x playback rate',
            action: 'quarterPlaybackRate',
            defaultKeybind: '6',
            invoke: () => commands.setPlaybackRate(0.25)
          },
          {
            name: '0.5x playback rate',
            action: 'halfPlaybackRate',
            defaultKeybind: '7',
            invoke: () => commands.setPlaybackRate(0.5)
          },
          {
            name: '2x playback rate',
            action: 'doublePlaybackRate',
            defaultKeybind: '8',
            invoke: () => commands.setPlaybackRate(2)
          },
          {
            name: '4x playback rate',
            action: 'quadruplePlaybackRate',
            defaultKeybind: '9',
            invoke: () => commands.setPlaybackRate(4)
          },
          {
            name: '1x playback rate',
            action: 'resetPlaybackRate',
            defaultKeybind: '0',
            invoke: () => commands.setPlaybackRate(1)
          },
          {
            name: '-'
          },
          {
            name: 'Set cue point',
            defaultKeybind: 'g',
            action: 'setCuePoint',
            invoke: () => commands.setCuePoint()
          },
          {
            name: 'Halve loop length',
            action: 'halveLoopLength',
            defaultKeybind: 't',
            invoke: () => commands.multiplyLoopLengthBy(0.5)
          },
          {
            name: 'Double loop length',
            action: 'doubleLoopLength',
            defaultKeybind: 'y',
            invoke: () => commands.multiplyLoopLengthBy(2.0)
          },
          {
            name: '-'
          },
          {
            name: 'Toggle stats',
            action: 'toggleStats',
            defaultKeybind: 'i',
            invoke: () => commands.toggleStats()
          },
          {
            name: 'Toggle framing overlay',
            action: 'toggleFramingOverlay',
            defaultKeybind: 'o',
            invoke: () => commands.toggleFramingOverlay()
          },
          {
            name: 'Toggle fullscreen',
            action: 'toggleFullscreen',
            defaultKeybind: 'enter',
            invoke: () => commands.toggleFullscreen()
          },
          {
            name: 'Mute',
            action: 'toggleMute',
            defaultKeybind: 'm',
            invoke: () => commands.toggleMusic()
          },
          {
            name: 'Play/pause',
            action: 'togglePlayPause',
            defaultKeybind: 'space',
            charCode: '32',
            invoke: () => commands.playPause()
          }
        ]
      },
      {
        name: 'Render',
        items: [
          {
            name: 'Start rendering',
            action: 'startRendering',
            invoke: () => commands.startRendering()
          },
          {
            name: 'Stop rendering',
            action: 'stopRendering',
            invoke: () => commands.stopRendering()
          }
        ]
      },
      {
        name: 'Generate',
        items: [
          {
            name: 'Node',
            action: 'generateNode',
            invoke: () =>  {
              commands.pause();
              const nodeName = window.prompt("Enter a name for the node:");
              commands.generate('node', nodeName);
            }
          },
          {
            name: 'THREE Node',
            action: 'generateTHREENode',
            invoke: () =>  {
              commands.pause();
              const nodeName = window.prompt("Enter a name for the node:");
              commands.generate('threeNode', nodeName);
            }
          },
          {
            name: 'Canvas Node',
            action: 'generateCanvasNode',
            invoke: () =>  {
              commands.pause();
              const nodeName = window.prompt("Enter a name for the canvas node:");
              commands.generate('canvasNode', nodeName);
            }
          },
          {
            name: 'Shader Node',
            action: 'generateShaderNode',
            invoke: () =>  {
              commands.pause();
              const nodeName = window.prompt("Enter the shader's name in CamelCase, like 'SunShader':");
              commands.generate('shaderNode', nodeName);
            }
          },
          {
            name: 'Overlay Node',
            action: 'generateOverlayNode',
            invoke: () =>  {
              commands.pause();
              const nodeName = window.prompt("Enter the overlayShader's name in CamelCase, like 'SunOverlayShader':");
              commands.generate('overlayNode', nodeName);
            }
          }
        ]
      },
      {
        name: 'Theme',
        items: [
          {
            name: 'Dark',
            action: 'activateDarkTheme',
            invoke: () => commands.selectTheme('dark')
          },
          {
            name: 'Light',
            action: 'activateLightTheme',
            invoke: () => commands.selectTheme('light')
          }
        ]
      },
      {
        name: 'Truck',
        items: [
          {
            name: 'nin',
            action: 'playSplashScreen',
            defaultKeybind: 'n',
            invoke: () => commands.playSplashScreen()
          }
        ]
      },
      {
        name: 'Help',
        items: [
          {
            name: 'Online wiki',
            action: 'help',
            invoke: () => window.open('https://github.com/ninjadev/nin/wiki')
          }
        ]
      }
    ];

    fetch('/.ninrc')
      .then(res => res.json())
      .then(ninrc => {
        this.menu.forEach(category => {
          category.items.forEach(item => {
            item.keybind =
              ninrc.keybinds && ninrc.keybinds[item.action]
              || item.defaultKeybind;
            if (item.keybind) {
              keymage(item.keybind, item.invoke);
            }
          });
        });
      });

    this.state = {
      open: false,
      focus: '',
      oldTopMenuOpen: false,
    };

    document.body.addEventListener('click', () => {
      if (this.state.oldTopMenuOpen) {
        setTimeout(() => {
          this.setState({
            open: false,
            oldTopMenuOpen: false,
          });
        });
      } else {
        setTimeout(() => {
          this.setState({
            oldTopMenuOpen: true
          });
        });
      }
    });

    this.handleTopMenuClick = menuName => e => {
      if (this.state.open && this.state.focus === menuName) {
        this.setState({
          open: false
        });
      } else {
        this.setState({
          open: true
        });
      }
    };

    this.handleClick = item => e => {
      item.invoke();
      this.setState({
        open: false,
        oldTopMenuOpen: false,
      });
    };
  }

  render() {
    return (
      <div className='top-menu'>
        { this.menu.map(menuGroup => (
          <div
            key={menuGroup.name}
            className={`menu-group ${(this.state.open && this.state.focus == menuGroup.name) ? 'selected' : ''}`}
            onMouseOver={() => this.setState({focus: menuGroup.name})}
            onClick={this.handleTopMenuClick(menuGroup.name)}
            >
            <div className='menu-item'>
              { menuGroup.name }
            </div>
            { this.state.open && this.state.focus == menuGroup.name
              ? <div
                  className='sub-menu'
                  onClick={() => this.setState({open: false})}
                  >
                  { menuGroup.items.map((item, index) => (
                    <div
                      key={index}
                      className={`menu-item ${item.name == '-' ? 'separator-item' : ''}`}
                      onClick={this.handleClick(item)}
                      >
                      { item.name === '-'
                        ? <div className='separator'></div>
                        : <div>
                            { item.name }
                            <span className='shortcut'>{ item.keybind }</span>
                          </div>
                      }
                    </div>
                  ))}
                </div>
              : null
            }
          </div>
        ))}
      </div>);
  }
}

module.exports = Menubar;
