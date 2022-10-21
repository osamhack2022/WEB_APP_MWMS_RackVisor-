import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AuthorHeader from '../../components/AuthorHeader'
import { AuthorContext } from '../../routes/Author'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../routes/AuthContext'
import Sidebar from '../../components/Sidebar'
import { getLSUnitList } from './UnitSelect'
import { axiosGet } from '../../api'

function HouseSelect() {
  let unitName = localStorage.getItem("부대");
  // houseList 예시: [{name : "1종창고", gridLayout: [], items: []}, {name : "2종창고", gridLayout: [], items: []}, {name : "3종창고", gridLayout: [], items: []} ] <- DB 설계에 따라 형식 바뀔 수 있음
  const [houseList, setHouseList] = useState([]);
  
  let auth = useAuth();
  const navigate = useNavigate();

  const fetchWarehouseList = useCallback(async () => {
    try {
      const data = [];
      // const data = await axiosGet("/units/all-units");
      setHouseList(data);
    } catch (error) {
      alert("Error on fetching unit");
    }
  }, []);

  useEffect(() => {
    fetchWarehouseList()
  }, [fetchWarehouseList]);


  // TODO: 서버로부터 unit(부대) 불러와야함...
  
      
  

  const onSelectHouse = (e) => {
    auth.houseSelect(e.target.id);
    navigate("/houseManage");
  }

  const addHouse = () => {
    const newName = prompt("창고명을 입력해주세요");
    if(newName === null)
    {
      return;
    }
    let lsUnitList = getLSUnitList();
    let lsUnit = lsUnitList.find( (e) => (e.name === unitName)); 
    let lsHouseList = lsUnit.houseList;
    lsHouseList.push({
      name: newName,
      gridLayout: [],
      items:[],
      iid: 0
    });
    localStorage.setItem("unitList", JSON.stringify(lsUnitList));
    setHouseList(lsHouseList);
  }
  
  useEffect(() => {
    auth.houseSelect("");
  }, []);
  
  return (
    <div>
      <AuthorHeader/>
      <div class="flex">
        <Sidebar/>
        <div class="flex-1">
          <div> 창고 관리 </div>
          <div class="grid grid-cols-4 gap-4 px-4 py-3 border-gray-200 bg-gray">
            {houseList.map((h) => (
              <div id={h.name} onClick={onSelectHouse} class="items-center justify-center block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div id = {h.name} onClick={onSelectHouse}  class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{h.name}</div>
              </div> 
            ))}
            <div onClick={addHouse} class="items-center justify-center block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <span class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">+ 창고 추가</span>
            </div> 
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HouseSelect