import {useRef} from 'react'
import ContentEditable from 'react-contenteditable'

const Greeting = ({period}) => {

    const greetingName = useRef('Zsuzsi')

    const handleChange = e => {
        greetingName.current = e.target.value
    }



    return (
        <div>
            <h2 className='greeting-row'>
                <span className='period'>{period}</span>
                <span>
                    <ContentEditable html={greetingName.current} onChange={handleChange}/>
                </span>
                <span>!</span>
            </h2>
        </div>
    )
}

export default Greeting
