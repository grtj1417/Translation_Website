import { useState, useEffect } from "react";

export default function Dialog({ setLanguage, i18n }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [countryImgSrc, setCountryImgSrc] = useState("./images/Taiwan.png");

    useEffect(() => {
        const dialog = document.querySelector(".select-country-dialog");
        const container = document.querySelector(".container");

        if (dialog && container) {
            if (openDialog) {
                dialog.showModal();
            } else {
                dialog.close();
            }
        }
    }, [openDialog]);


    const handleSelectCountry = (e) => {
        setCountryImgSrc(e.target.src);
        const selectedLanguage  = e.target.dataset.value;//可取data-*屬性資料
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
        setOpenDialog(false);
    };

    return (
        <>
            <img className='flag' onClick={() => setOpenDialog(true)} src={countryImgSrc} alt="" />
            {openDialog && (
                <dialog className="select-country-dialog" draggable="false">
                    <img className="cancel" onClick={() => setOpenDialog(false)} src="./images/cancel.svg" alt="" />
                    <img className='select-country-flag'
                        data-value="zh"
                        onClick={handleSelectCountry}
                        src="./images/Taiwan.png" alt="" />
                    <img className='select-country-flag'
                        data-value="en"
                        onClick={handleSelectCountry}
                        src="./images/American.png" alt="" />
                    <img className='select-country-flag'
                        data-value="id"
                        onClick={handleSelectCountry}
                        src="./images/Indonesia.svg" alt="" />
                </dialog>
            )}
        </>
    );
}
