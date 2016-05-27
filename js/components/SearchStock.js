import React from 'react'

const SearchStock = () => {
	let search

	return (
		<div>
			<input placeholder="請輸入" ref={node => {
				search = node
			}}/>
		</div>
	)	
}
	


export default SearchStock