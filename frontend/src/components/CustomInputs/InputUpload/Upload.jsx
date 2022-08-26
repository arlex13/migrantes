import { useRef, useEffect, useState } from "react";
import "./upload.css";
import LoadMask from "../../LoadMask";
import _ from "lodash";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PreviewIcon from "@mui/icons-material/Preview";

function FileObject({ file }) {
  return (
    <div className="uploaded-file-container" key={file.name}>
      <div>
        <span>{file.name}</span>
      </div>
      <div>
        <FileDownloadIcon />
        <PreviewIcon />
      </div>
    </div>
  );
}

export default function Upload(props) {
  const [loading, setLoading] = useState(false);
  const input = useRef();
  const disabled = props.disabled || false;

  const onFileChange = (e, file) => {
    try {
      setLoading(true);
      file = file || e.target.files[0];
      let _files = [];
      if (_.isArray(props.files)) _files = [...props.files];
      if (file !== undefined) _files.push(file);
      props.onChange(_files);
    } finally {
      setLoading(false);
    }
  };
  const onClick = () => {
    if (!disabled) input.current.click();
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (!disabled) onFileChange(e, e.dataTransfer.files[0]);
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onRemove = () => {
    props.onChange(null);
    if (input.current) input.current.value = "";
  };
  const arrayFiles = Array.from(props.files || []);
  return (
    <>
      <LoadMask loading={loading}>
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 md:gap-x-20 mt-4">
            {arrayFiles.map((file) => (
              <FileObject file={file} />
            ))}
          </div>
          <br />
          <div
            key="label"
            className="upload-container"
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={onClick}
          >
            <input
              type="file"
              accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
              onChange={onFileChange}
              style={{ display: "none" }}
              ref={input}
            ></input>
            <div className=" is-flex is-justify-content-center">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAB/0lEQVR4nO2bv0rDUBTGv9haiygWRyV2UHByL9YHcHCsT+KgiFAU1EHQvocdfQMtPkAnBwWVzpKqaCVQp4iIpPH2nvt59fy2/Lkn3/mRmzQ0CWDAarPfArBsMtaE6PapdbkxuSJRe8RwnLPmAeCtG1eXjx8vJWqbCnBOL4orEhK8EQDISPBKAGBfgncCALsSvBQA2JPgrQDAjgSvBQDDS/BCwOh4PnV7L4or1ZPnC5Pa6ZV/CaX5iSy7VU1qe3EGSKIC2AHYqAB2ADYqgB2AjQpgB2CjAtgB2KgA1oFLuQiN8iYa5S2UchErBkfAVK6L/XAPC8UbLBSvcThXx3T+gRHFvYCpXBcH4S7KY3cf68JCB/vhLkWCUwHfNZ/AkuBMQFrzCQwJTgRkaT7BtQRxAT9pPsGlBFEBJs0nuJIgJmCY5hNcSBARYKP5BGkJIgLqs4dWmk8ICx3szBxZq/cZEQGv/aL1mi8CNQGhP0a27+vfrj9bXM80fu3q1GacVPRpkB2AjQpgB2CjAtgB2KgAdgA2KoAdgI0KMBoVwOiNLGHOTQYFtlOkEbdr/Sz75ZeaznLpFHB8vMFTJzA7lRXFA+J2rRW3a+dZl13g+l3hrx9bDVoWR+8C7ABsVAA7ABvXF8ELBEj7OTxo+98ibtf6WZ8PpPj3U+DfC2B/NEWf8+8x8quKI4STVAAAAABJRU5ErkJggg==" />
            </div>
            {props.uploadText && (
              <>
                <p className="upload-text p-2 m-0">{props.uploadText || ""}</p>
              </>
            )}
          </div>
        </>
      </LoadMask>
    </>
  );
}
