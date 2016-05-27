import React from 'react'
import { render } from 'react-dom'
import SearchStock from './components/SearchStock'

fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.emega.com.tw%2Fjs%2FStockTable.htm'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
	.then(response => response.json())
    .then(json => {
    	let rawDatas = json.query.results.body.table[0].tbody.tr
    	let sortData = []

    	for (let i = 0; i < rawDatas.length; i++) {
    		let rawData = rawDatas[i].td

    		for (let j = 0; j < rawData.length; j++) {
    			sortData[j] = sortData[j] === undefined ? [] : sortData[j]
    			sortData[j][i] = rawData[j].b === undefined ? rawData[j].content : rawData[j].b
    		}  		
    	}
    	
    	console.log(sortData)

    	/*for (let i = 0; i < rawDatas.length; i++) {
    		let rawData = rawDatas[i].td

    		for (let j = 0; j < rawData.length; j+=2)
    			sortData[rawData[j].content.trim()] = rawData[j+1].content.trim()		
    	}
    	
    	console.log(sortData)*/

    	render(
			<SearchStock />,
			document.getElementById('content')
		)   	
    })
    .catch(ex => alert('同步資料失敗，請重新整理'))