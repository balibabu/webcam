import React, { useState } from 'react'
import { caution, down } from './http/Upload';

export default function Controls() {
    const [pwd, setPwd] = useState('');
    const [visible, setVisible] = useState(false);

    function change(e){
        setPwd(e.target.value);
        if(e.target.value==='72801'){
            setVisible(true);
        }
    }

    return (
        <div>

            <input type='text' value={pwd} onChange={change} />
            {visible &&
                <>
                    <button onClick={() => down(pwd, setPwd)}>done</button>
                    <footer style={{ position: 'fixed', bottom: '10px' }}>
                        <button onClick={() => caution(pwd, setPwd)}>free</button>
                    </footer>
                </>
            }
        </div>
    )
}