import React from 'react';
import TextArea from './TextArea/TextArea';
import marked from 'marked';
import classes from './App.module.css';
import bsStyles from './bootstrap.module.css';

class App extends React.Component {
  state = {
    plainText: '',
    markdown: '',
    html: '',
    output: '',
    isPreview: false
  }

  convert2MarkDown = (event) => {
    marked.setOptions({
      gfm: true,
      breaks: true,
    });

    this.setState({plainText: event.target.value});

    let markdown = event.target.value
      .replace(
        /^(.[^\s]*) (.[^\s]*) .[^\s]* \[upgradable from: (.[^\s]*)\]\n?/gm,
`  - $1 to \`v$2\` from \`v$3\`
`
      );

    markdown = `- Upgraded OS Packages:
` + markdown;

    this.setState({markdown: markdown});
    this.setState({html: marked(markdown)});
    this.setState({output: markdown});
  }

  selectAll = (event) => {
    let range;
    let selection;

    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(event.target);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(event.target);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  previewMarkdown = () => {
    const isPreview = !this.state.isPreview;
    this.setState({isPreview: isPreview});

    if (isPreview) {
      this.setState({output: this.state.html});
    } else {
      this.setState({output: this.state.markdown});
    }
  }

  render() {
    const rightColClass = [bsStyles['col-md-6'], bsStyles['py-3'], classes['h-70vh']];
    const resultWrapClass = [bsStyles['text-monospace'], bsStyles['text-left'], bsStyles['form-control'], classes['h-70vh'], classes.prewrap];

    let buttonText = 'Preview Markdown';

    if (this.state.isPreview) {
      buttonText = 'Restore';
    }

    return (
      <div className={[classes.App, bsStyles['py-3']].join(' ')}>
        <div className={[bsStyles['container-fluid'], bsStyles.clearfix].join(' ')}>
          <h1>APT Updates to Markdown</h1>
          <p>Convert the output of <code>apt update && apt list --upgradable</code> on the updates page to markdown, ready for your changelogs!</p>
          <div className={bsStyles.row}>
            <div className={bsStyles['col-md-6']}>
              <TextArea value={this.state.plainText} change={this.convert2MarkDown} placeholder="Paste the APT output here." />
            </div>
            <div className={rightColClass.join(' ')}>
              <div
                className={resultWrapClass.join(' ')}
                onFocus={(event) => this.selectAll(event)}
                dangerouslySetInnerHTML={{__html: this.state.output}}
                contentEditable></div>
            </div>
          </div>

          <button className={[bsStyles.btn, bsStyles['btn-primary']].join(' ')} onClick={this.previewMarkdown}>{buttonText}</button>
        </div>
      </div>
    )
  };
}

export default App;
