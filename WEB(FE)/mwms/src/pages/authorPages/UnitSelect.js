import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer';
import { useAuth } from '../../routes/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthorHeader from '../../components/AuthorHeader';
import Title from '../../utils/with_description';
import UIModal from '../../utils/modal/simple_with_dismiss_button';
import Example from '../../utils/simple';


// lsUnitList 예시 [{name: "123부대"}, {name: "456부대"}, ... ]
export function getLSUnitList()
{
  let lsUnitList = localStorage.getItem("unitList");
  if(lsUnitList === null)
  {
    lsUnitList = [];
  }
  else
  {
    lsUnitList = JSON.parse(lsUnitList);
  }
  return lsUnitList;
}

let lsUnitList = getLSUnitList();

function UnitSelect() {
  const navigate = useNavigate();
  const [unitList, setUnitList] = useState(lsUnitList);
  //11번째 줄에서 서버에서 unit의 리스트를 받아오면 된다
  let auth = useAuth();

  const onSelectUnit = (e) => {
    auth.unitSelect(e.target.id);
    e.stopPropagation();
    navigate("/main");
  }

  const addUnit = () => {
    const newName = prompt("부대명을 입력해주세요"); //부대명이 서로 달라야 함
    let lsUnitList = getLSUnitList();
    lsUnitList.push({
      name: newName,
      houseList: [],
    });
    localStorage.setItem("unitList", JSON.stringify(lsUnitList));
    setUnitList(lsUnitList);
  }

  useEffect(() => {
    auth.unitSelect("");
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <body>
        <AuthorHeader />
        <Title title={"부대 선택"} descript={"부대를 선택해주세요"}/>
        <div class="grid grid-cols-4 gap-4 px-4 py-3 border-gray-200 bg-gray">
          {unitList.map((un) => (
            <div id={un.name} onClick={onSelectUnit} class="items-center justify-center block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 id={un.name} onClick={onSelectUnit} class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{un.name}</h5>
            </div>
          ))}
          <div onClick={addUnit} class="items-center justify-center block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">+ 부대 추가</h5>
          </div>
          <Example/> 
        </div>
        <button onClick={() => setOpen(true)}>excel로 업로드</button>
        <UIModal open={open} setOpen={setOpen}/>
        <Footer/>

      </body>
    </div>
  )
}

export default UnitSelect