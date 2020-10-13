import React, { useState, useEffect } from "react";
import { CardMain } from "./CardMain";
import "./MainPage.css";
import { Link } from "react-router-dom";
import dataSet from "./example.json";

const MainPage = ({ cards, cardData, stage, save }) => {
  const cardDataTotal = dataSet.data;
  const [view, setView] = useState(0);
  const [lang, setLang] = useState("korean");
  const [setCard, setSetCard] = useState(
    cards.map((data) => ({
      id: data,
      korean: cardDataTotal.filter((set) => set.id === data)[0].korean,
      english: cardDataTotal.filter((set) => set.id === data)[0].english,
      stage: stage,
    }))
  );
  // console.log(setCard);
  const pass = () => {
    // let newStage = setCard[view].stage === 4 ? 4 : setCard[view].stage + 1;
    // console.log(newStage);

    const modifiedData = setCard.map((item) =>
      item.id === setCard[view].id
        ? {
            ...item,
            stage: setCard[view].stage === 4 ? 4 : setCard[view].stage + 1,
          }
        : item
    );

    setSetCard(modifiedData);
    // setSetCard((data)=>{modifiedData.id===data.id});
    // this.setState({ data: modifiedData });
    next();
  };
  const next = () => {
    let nextView = view === setCard.length - 1 ? view : view + 1;
    setView(nextView);
    setLang("korean");
  };
  const pre = () => {
    let preView = view === 0 ? view : view - 1;
    setView(preView);
    setLang("korean");
  };
  const changeLang = () => {
    const newLang = lang === "korean" ? "english" : "korean";
    setLang(newLang);
  };

  const updateSave = () => {
    const newStage1 = cardData.stage1;
    const newStage2 = cardData.stage2;
    const newStage3 = cardData.stage3;
    const newStage4 = cardData.stage4;

    setCard.map((card) => {
      if (stage === 1 && card.stage !== 1) {
        newStage1.splice(newStage1.indexOf(card.id), 1);
        newStage2.push(card.id);
        console.log(newStage2);
      } else if (stage === 2 && card.stage !== 2) {
        newStage2.splice(newStage2.indexOf(card.id), 1);
        newStage3.push(card.id);
      } else if (stage === 3 && card.stage !== 3) {
        newStage3.splice(newStage3.indexOf(card.id), 1);
        newStage4.push(card.id);
      }
    });

    save();
  };

  return (
    <section className="container">
      <div className="back">
        <Link to="/">←</Link>
      </div>
      <div className="status">
        <span>
          {setCard[view].stage} 단계 ({view + 1} / {setCard.length})
        </span>
      </div>
      <div></div>
      <div className="sideButtons" onClick={pre}>
        <span>◀</span>
      </div>
      <div className="cards" onClick={changeLang}>
        <CardMain value={setCard[view]} lang={lang} />
      </div>
      <div className="sideButtons" onClick={next}>
        <span>▶</span>
      </div>
      <div></div>
      <div className="buttons">
        <button className="button" onClick={next}>
          FAIL
        </button>
        <span> Stage {setCard[view].stage} </span>
        <button className="button" onClick={pass}>
          PASS
        </button>
      </div>
      <div>
        <button className="save" onClick={updateSave}>
          Save
        </button>
      </div>
    </section>
  );
};

export default MainPage;

// class MainPage extends React.Component {
//   constructor(props) {
//     super(props);
//     const levelTotal = props.cards;
//     this.state = {
//       data: levelTotal,
//       view: 0,
//       lang: "korean",
//     };
//     this.pass = this.pass.bind(this);
//     this.next = this.next.bind(this);
//     this.pre = this.pre.bind(this);
//     this.changeLang = this.changeLang.bind(this);
//   }
//   pass() {
//     let newLevel =
//       this.state.data[this.state.view].level === 4
//         ? 4
//         : this.state.data[this.state.view].level + 1;
//     const modifiedData = this.state.data.map((item) =>
//       item.id === this.state.data[this.state.view].id
//         ? { ...item, level: newLevel }
//         : item
//     );
//     this.setState({ data: modifiedData });
//     this.next();
//   }
//   next() {
//     let nextView =
//       this.state.view === this.state.data.length - 1
//         ? this.state.view
//         : this.state.view + 1;
//     this.setState({
//       view: nextView,
//       lang: "korean",
//     });
//   }
//   pre() {
//     let preView = this.state.view === 0 ? this.state.view : this.state.view - 1;
//     this.setState({
//       view: preView,
//       lang: "korean",
//     });
//   }
//   changeLang() {
//     const newLang = this.state.lang === "korean" ? "english" : "korean";
//     this.setState({
//       lang: newLang,
//     });
//   }
//   save() {
//     alert("저장되었습니다.");
//   }

//   render() {
//     // console.log(this.state.view);
//     return (
//       <section className="container">
//         <div className="back">
//           <Link to="/">←</Link>
//         </div>
//         <div className="status">
//           <span>
//             {this.props.level} 단계 ({this.state.view + 1} /{" "}
//             {this.state.data.length})
//           </span>
//         </div>
//         <div></div>
//         <div className="sideButtons" onClick={this.pre}>
//           <span>◀</span>
//         </div>
//         <div className="cards" onClick={this.changeLang}>
//           <CardMain
//             value={this.state.data[this.state.view]}
//             lang={this.state.lang}
//           />
//         </div>
//         <div className="sideButtons" onClick={this.next}>
//           <span>▶</span>
//         </div>
//         <div></div>
//         <div className="buttons">
//           <button className="button" onClick={this.next}>
//             FAIL
//           </button>
//           <span> Level {this.state.data[this.state.view].level} </span>
//           <button className="button" onClick={this.pass}>
//             PASS
//           </button>
//         </div>
//         <div>
//           <button className="save" onClick={this.save}>
//             Save
//           </button>
//         </div>
//       </section>
//     );
//   }
// }

// export default MainPage;
