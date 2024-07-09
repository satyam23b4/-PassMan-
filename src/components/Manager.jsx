import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [ShowPassword, setShowPassword] = useState(false);
    const [forms, setForms] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    };

    useEffect(() => {
        getPasswords();
        
    }, []);

    const copyText = (text) => {
        toast.info('Copied to clipboard!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    };

    const HandleChange = (e) => {
        setForms({ ...forms, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword((PrevShowPassword) => !PrevShowPassword);
    };

    const SavePassword = async () => {
        if(!forms.site || !forms.username || !forms.password){
            toast.error('please fill all the fields.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        else{
            //localStorage.setItem('password', JSON.stringify([...passwordArray, {...forms, id: uuidv4()}]));
            //await fetch("http://localhost:3000/", {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id:forms.id})})
            setPasswordArray([...passwordArray, {...forms, id: uuidv4()}]);
            await fetch("http://localhost:3000/", {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({...forms, id: uuidv4()})})
            setForms({ site: "", username: "", password: "" });
        }
    };

    const Delete = async (id) => {
        let c = confirm("Are you sure you want to delete this password?");
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id));
            //localStorage.setItem('password', JSON.stringify(passwordArray.filter(item=>item.id!==id)));
            await fetch("http://localhost:3000/", {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id})})
            toast.info('Deleted Succesfully!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    };

    const Edit = async (id) => {
        await fetch("http://localhost:3000/", {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id:forms.id})})
        setForms({...passwordArray.filter(item=>item.id===id)[0], id : id});
        setPasswordArray(passwordArray.filter(item=>item.id!==id));
        // localStorage.setItem('password', JSON.stringify([...passwordArray, {...forms, id: uuidv4()}]));
        // setForms({ site: "", username: "", password: "" });
        // console.log([...passwordArray, forms]);
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className='container mx-auto max-w-4xl pt-10'>
                <div className='flex justify-center text-white mt-10 text-3xl font-thin'>
                    <span>&lt;</span>
                    PassMan/
                    <span>&gt;</span>
                </div>
                <p className='flex justify-center text-white'>Your Passwords guy :)</p>
                <div className='text-black flex flex-col p-4 m-2'>
                    <input value={forms.site} onChange={HandleChange} placeholder='Enter the website URL' type="text" className='rounded-lg p-1 focus:outline-none' name='site' id='' />
                    <div className='flex m-2 justify-center gap-8 pt-4'>
                        <input value={forms.username} onChange={HandleChange} placeholder='Enter username' type="text" className='p-1 rounded-lg focus:outline-none w-1/2' name='username' />
                        <div className='relative'>
                            <input value={forms.password} onChange={HandleChange} placeholder='Enter password' type={ShowPassword ? 'text' : 'password'} className='p-1 rounded-lg focus:outline-none pr-10' name='password' />
                            <span className="hover:cursor-pointer material-symbols-outlined absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={togglePasswordVisibility}>
                                {ShowPassword ? 'visibility_off' : 'visibility'}
                            </span>
                        </div>
                    </div>

                    <button className='relative flex mt-4 items-center mx-auto rounded-full justify-center p-1' onClick={SavePassword} >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="loop-on-hover"
                            colors="primary:#ffffff"
                            style={{ width: '20px', height: '20px'}}>
                        </lord-icon>
                        <span className='text-white hover:font-semibold text-lg pl-1'>Save</span>
                    </button>
                </div>
                <div className='passwords flex flex-col justify-center text-white'>
                    <h2 className='mt-5'>Your Passwords: </h2>
                    {passwordArray.length === 0 && <div>No Passwords saved yet</div>}
                    {passwordArray.length !== 0 && (
                        <table className="table-auto w-full mt-8 max-w-4xl">
                            <thead>
                                <tr>
                                    <th>Site</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-center py-2 font-thin'>
                                            <div className='flex items-center justify-center'>
                                                <span className='hover:underline'>
                                                    <a href={item.site} target='_blank' rel='noopener noreferrer'>{item.site}</a>
                                                </span>
                                                <div className='lordiconcopy cursor-pointer ml-2' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/xljvqlng.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff"
                                                        style={{ width: '20px', height: '20px', 'paddingTop': '4px'}}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 font-thin cursor-pointer'>
                                            <div className='flex items-center justify-center'>
                                                <span className=''>
                                                    {item.username}
                                                </span>
                                                <div className='lordiconcopy cursor-pointer ml-2' onClick={() => {copyText(item.username)}}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/xljvqlng.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff"
                                                        style={{ width: '20px', height: '20px', 'paddingTop': '4px'}}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 font-thin cursor-pointer'>
                                            <div className='flex items-center justify-center'>
                                                <span className=''>
                                                    {item.password}
                                                </span>
                                                <div className='lordiconcopy cursor-pointer ml-2' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/xljvqlng.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff"
                                                        style={{ width: '20px', height: '20px', 'paddingTop': '4px'}}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 font-thin cursor-pointer text-xs'>
                                            <button className='hover:font-semibold' onClick={()=>Delete(item.id)}>Delete
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff"
                                                    style={{width:'15px', height:'15px', 'paddingTop': '4px', 'paddingLeft': '2px'}}>
                                                </lord-icon>
                                            </button>
                                            <span className='mx-2'>|</span>
                                            <button className='hover:font-semibold' onClick={()=>Edit(item.id)}>Edit
                                            <lord-icon
                                                    src="https://cdn.lordicon.com/qnpnzlkk.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff"
                                                    style={{width:'15px', height:'15px', 'paddingTop': '4px', 'paddingLeft': '2px'}}>
                                                </lord-icon>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default Manager;
