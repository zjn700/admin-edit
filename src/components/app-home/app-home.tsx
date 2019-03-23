import { Component, Prop, State } from "@stencil/core";
import { tagList } from "../../global/editor";
// import * as jodit from 'jodit'
// import { JoditObject } from "jodit/src/modules/helpers";
// import { Jodit } from "jodit/src/Jodit";
// import { Marked } from "marked-ts";
// import * as marked from "marked";
// import { turndownService } from "../../global/shared";
// import * as tds from "turndown";
// import { TurndownService } from "turndown";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {
  @Prop() dfm: any = `{}`;
  @State() editor: any; // = document.getElementsByClassName("jodit_wysiwyg")[0];
  @Prop() dfmx: any = ` {
    buttons: [
        'image',
        {
            iconURL: 'assets/icon/icon.png',
            exec: function (editor) {
                if (editor.selection.isCollapsed()) {
                    editor.execCommand('selectall');
                }
                editor.execCommand('copy');
                Jodit.Alert('Text in your clipboard-');
            }
        }
    ],
    extraButtons: ["info"],
    removeButtons: ["italic"]
}`;

  // @Prop() dfmx = `{buttons: ['bold', 'italic', 'source']}`;
  // dfm = `{buttons: ['bold', 'italic', 'source'], defaultMode: Jodit.MODE_SPLIT}`;
  componentDidLoad() {
    console.log("Component is about to be rendered");
    this.editor = document.getElementsByClassName("jodit_wysiwyg")[0];
    console.log("this editor", this.editor);

    // this.editor = new Jodit("#editor2");=
    // document.getElementById("content").innerHTML = marked(
    //   "# Marked in the browser\n\nRendered by **marked**."
    // );
    // let el: HTMLElement;
    // let turndownService: tds.ReplacementFunction;
    // let markdown = new tds();
    // var turndownService = new tds();
    // var markdown = turndownService.turndown('<h1>Hello world!</h1>')

    // console.log("h2m", turndownService.turndown("<h1>Hello world!</h1>"));

    // let m2m = $("text");
    // console.log(m2m);
    // let markdown = myH2m(<div>?????hello</div>, { preferBuiltins: true });
    // console.log("h2m", markdown);
    // console.log("???---");
  }

  sanitizeElements(tag: string, classes) {
    console.log("san ele", tag, classes);
    this.removeUnwantedProperies(tag, "temp-tag", null);
    this.removeUnwantedProperies("temp-tag", tag, classes);
  }

  removeUnwantedProperies(tagOne: string, tagTwo: string, classes) {
    let elements = this.editor.getElementsByTagName(tagOne);

    console.log("elen len", elements.length, classes);
    if (elements.length > 0) {
      let innerHtml = elements[0].innerHTML;
      console.log("inn htm", innerHtml);
      if (tagTwo == "script") {
        tagTwo = "div";
      }
      let replacementElement = document.createElement(tagTwo);
      console.log("rep ele", replacementElement);
      if (classes) {
        replacementElement.classList.add(classes);
      }
      tagOne == "script"
        ? (replacementElement.innerHTML =
            "&lt;script&gt;" + innerHtml + "&lt;/script&gt;")
        : (replacementElement.innerHTML = innerHtml);

      console.log("rep ele inn htm", replacementElement.innerHTML);
      elements[0].replaceWith(replacementElement);
      if (elements.length - 1 > -1) {
        this.removeUnwantedProperies(tagOne, tagTwo, classes);
      }
      // } else {
      //   this.removeUnwantedProperies(tag, classes);
      // }
    }
  }
  removeScripts() {
    // let codeTags2 = document.getElementsByClassName("jodit_wysiwyg");

    // let scripts = codeTags2[0].getElementsByTagName("script");
    let scripts = this.editor.getElementsByTagName("script");
    if (scripts.length > 0) {
      let innerHtml = scripts[0].innerHTML;
      let div = document.createElement("div");
      div.classList.add("code");
      div.innerHTML = "&lt;script&gt;" + innerHtml + "&lt;/script&gt;";
      scripts[0].replaceWith(div);
      if (scripts.length - 1 > -1) {
        this.removeScripts();
      }
    }
  }

  async formSunmit(event) {
    let codeTags2 = document.getElementsByClassName("jodit_wysiwyg");
    if (codeTags2.length == 0) {
      return;
    }
    console.log(event.srcElement.parentElement.children);
    // this.removeScripts();

    tagList.forEach(tag => {
      console.log(tag);
      this.sanitizeElements(tag.name, tag.class);
    });

    // this.sanitizeElements("div", "h1");
    // this.sanitizeElements("span", null);
    this.removeScripts();

    // this.removeUnwantedProperies("div", "temp-tag", null);
    //   this.removeUnwantedProperies("temp-tag", "div", null);

    // let codeTags = document.getElementsByClassName("jodit_wysiwyg");
    // console.log("codeTags", codeTags);
    // for (let index = 0; index < codeTags.length; index++) {
    //   let script = codeTags[index].getElementsByTagName("script");
    //   console.log("index", index, "script-list", script);
    //   // if (code.length > 0) {
    //   for (let index2 = 0; index2 < script.length / 2; index2++) {
    //     console.log("index2", index2, "script", script[index2]);
    //     let div = document.createElement("div");
    //     div.classList.add("code");
    //     div.innerHTML =
    //       "&lt;script&gt;" + script[index2].innerHTML + "&lt;/script&gt;";
    //     script[index2].replaceWith(div);
    //     console.log("index2", index2, div);
    //     // code[index].firstChild.replaceWith(`span`);
    //   }
    //   // console.log("index", index);
    // }

    let paragraphs = document.getElementsByTagName("p");
    console.log(paragraphs.length);
    for (let index = 0; index < paragraphs.length / 2; index++) {
      // for (let index in paragraphs) {
      console.log(paragraphs[index]);
      let name = "mystyle";
      if (paragraphs[index].className) {
        let arr = paragraphs[index].className.split(" ");
        if (arr.indexOf(name) == -1) {
          paragraphs[index].className += " " + name;
          // paragraphs[index].childNodes.forEach.name
        }
      } else {
        paragraphs[index].className = name;
      }
      console.log("name", paragraphs[index].childNodes);
    }

    let jd = document.getElementById("editor") as HTMLDivElement;

    console.log(jd.innerHTML);

    var cm = document.getElementsByClassName("CodeMirror")[0] as HTMLDivElement;
    console.log(cm.innerText);
    // console.log(cm.);
    var text = document.getElementById("MyID") as HTMLInputElement;

    // alert(text.value);
    // text.value = "kjhlkhlkhj";
    console.log("jjj", text);
  }

  render() {
    return [
      // <script>
      //   var simplemde = new SimpleMDE();
      // </script>,

      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <div id="editor" />
        {/* <textarea id="editor">Some text</textarea> */}

        {/* <script>var editor = new Jodit('#editor', {this.customButton});</script> */}
        <script>var editor = new Jodit('#editor', {this.dfm});</script>
        <button onClick={event => this.formSunmit(event)}>Submit</button>

        {/* <script>var editor = new Jodit('#editor');</script> */}
        {/* <script>Jodit.modules.Dom('#editor').addClass('wysiwyg');</script> */}
        {/* <div id="editor" /> */}
        <script>var simplemde = new SimpleMDE();</script>
        {/* <textarea form="usrform" id="MyID" />, */}
        <div>
          <div>
            <textarea form="usrform" id="MyID" />,
            <button onClick={event => this.formSunmit(event)}>subnit</button>
          </div>
          Welcome to the PWA Toolkit. You can use this starter to build entire
          apps with web components using Stencil and ionic/core! Check out the
          README for everything that comes in this starter out of the box and
          check out our docs on{" "}
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </div>
        <ion-button href="/profile/ionic" expand="block">
          Profile page
        </ion-button>
      </ion-content>
    ];
  }
}

// @Prop() dfm
// dfm = `{buttonsXS: ['bold', 'italic', 'source', 'fullsize', 'source',
//       '|',
//       'bold',
//       'strikethrough',
//       'underline',
//       'italic',
//       '|',
//       'superscript',
//       'subscript',
//       '|',
//       'ul',
//       'ol',
//       '|',
//       'outdent',
//       'indent',
//       '|',
//       'font',
//       'fontsize',
//       'brush',
//       'paragraph',
//       '|',
//       'align',
//       'undo',
//       'redo',
//       'cut',
//       'hr',
//       'eraser',
//       'symbol',
//       'fullsize',
//       'selectall'],
//         buttonsMD: ['bold', 'italic'],
//         buttons: ['bold', 'fullsize'],
//       removeButtons: ['hr']}`;
