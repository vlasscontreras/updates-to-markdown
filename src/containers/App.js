import React from 'react';
import marked from 'marked';
import classes from './App.module.css';
import bsStyles from '../assets/bootstrap.module.css';
import TextArea from '../components/TextArea/TextArea';

/**
 * The App component
 */
class App extends React.Component {
  /**
   * Construct the component
   *
   * @param {Object} props Component props.
   */
  constructor(props) {
    super(props);

    marked.setOptions({
      gfm: true,
      breaks: true,
    });
  }

  state = {
    /** Inputted text. */
    input: '',

    /** Source of updates: apt/wp */
    source: 'apt',

    /** Inputted text converted to Markdown. */
    markdown: '',

    /** Markdown converted to HTML. */
    html: '',

    /** Current displayed content in the output text area. */
    output: '',

    /** If the current view is previewing HTML. */
    isPreview: false
  }

  /**
   * Update the base input
   *
   * @param {Object} event The event that triggered this method.
   */
  updateInput = (event) => {
    this.setState({
      input: event.target.value,
    }, () => {
      this.convert2MarkDown();
    });
  }

  /**
   * Convert the inputted text to Markdown using marked.
   */
  convert2MarkDown = () => {
    let markdown;

    if (this.state.source === 'apt') {
      markdown = `- Upgraded OS Packages:<br>` + this.state.input.replace(
        /^(.[^\s]*) (.[^\s]*) .[^\s]* \[upgradable from: (.[^\s]*)\]\n?/gm,
        '  - $1 to `v$2` from `v$3`<br>'
      );
    } else if (this.state.source === 'wp') {
      markdown = `- Upgraded WordPress Packages:<br>` + this.state.input.replace(
          /(.*)\nYou have version (\d.*) installed. Update to (\d.*)(. View version \d.* details.)\n(Compatibility with WordPress \d.*: .*)(\n.*)?\n?(\n?\n?.*\n?\n?\n?)/gm,
          '  - $1 to `v$3` from `v$2`<br>'
        );
    }

    this.setState({
      markdown: markdown,
      html: marked(markdown),
      output: markdown
    });
  }

  /**
   * Update selected source
   *
   * @param {Object} event The event that triggered this action.
   */
  updateSource = (event) => {
    this.setState({
      source: event.target.value
    }, () => {
      this.convert2MarkDown();
    });
  }

  /**
   * Select the text of the clicked event.target.
   *
   * @param {Object} event The event that triggered this method.
   */
  selectAll = (event) => {
    let range = document.createRange();
    let selection = window.getSelection();

    range.selectNodeContents(event.target);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /**
   * Preview the Markdown in HTML
   */
  previewMarkdown = () => {
    const isPreview = ! this.state.isPreview;

    this.setState({
      isPreview: isPreview
    });

    if (isPreview) {
      this.setState({
        output: this.state.html
      });
    } else {
      this.setState({
        output: this.state.markdown
      });
    }
  }

  render() {
    const rightColClass = [
      bsStyles['col-md-6'],
      bsStyles['py-3'],
      classes['h-60vh']
    ];

    const resultWrapClass = [
      bsStyles['text-monospace'],
      bsStyles['text-left'],
      bsStyles['form-control'],
      classes['h-60vh'],
      classes.prewrap
    ];

    let buttonText = 'Preview Markdown';

    if (this.state.isPreview) {
      buttonText = 'Restore';
    }

    let sourceReference;

    if (this.state.source === 'apt') {
      sourceReference = '<code>apt list --upgradable</code>';
    } else if (this.state.source === 'wp') {
      sourceReference = 'the WordPress updater page'
    }

    return (
      <div className={[classes.App, bsStyles['py-3']].join(' ')}>
        <div className={[bsStyles['container-fluid'], bsStyles.clearfix].join(' ')}>
          <h1>Updates to Markdown</h1>

          <div className={[bsStyles['form-check'], bsStyles['form-check-inline']].join(' ')}>
            <input
              className={bsStyles['form-check-input']}
              name="source"
              type="radio"
              id="sourceAPT"
              value="apt"
              defaultChecked
              onChange={this.updateSource} />
            <label className={bsStyles['form-check-label']} htmlFor="sourceAPT">APT</label>
          </div>
          <div className={[bsStyles['form-check'], bsStyles['form-check-inline']].join(' ')}>
            <input
              className={bsStyles['form-check-input']}
              name="source"
              type="radio"
              id="sourceWP"
              value="wp"
              onChange={this.updateSource} />
            <label className={bsStyles['form-check-label']} htmlFor="sourceWP">WP</label>
          </div>

          <p>Convert the output of <span dangerouslySetInnerHTML={{__html: sourceReference}}></span> to markdown, ready for your changelogs!</p>

          <div className={bsStyles.row}>
            <div className={bsStyles['col-md-6']}>
              <TextArea value={this.state.input} change={this.updateInput} placeholder="Paste the APT output here." />
            </div>

            <div className={rightColClass.join(' ')}>
              <div
                className={resultWrapClass.join(' ')}
                onFocus={this.selectAll}
                dangerouslySetInnerHTML={{__html: this.state.output}}
                contentEditable></div>
            </div>
          </div>

          <button
            className={[bsStyles.btn, bsStyles['btn-primary']].join(' ')}
            onClick={this.previewMarkdown}>{buttonText}</button>
        </div>
      </div>
    )
  };
}

export default App;
