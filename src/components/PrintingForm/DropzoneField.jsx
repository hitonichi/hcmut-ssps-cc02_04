import { Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';

import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import { useCallback, useEffect, useState } from 'react';

export const DropzoneField = ({ name, multiple, ...rest }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field }) => (
        <Dropzone
          multiple={multiple}
          additionalOnDropAccepted={(files) => {
            // console.log('[INFO] add.onChange Dropzone event', files);
            field.onChange(multiple ? files : files[0]);
          }}
          // {...restProps}
          onChange={(e) => {
            // console.log('[INFO] onChange Dropzone event', e);
            field.onChange(multiple ? e.target.files : e.target.files[0]);
          }}
          {...rest}
        />
      )}
      name={name}
      control={control}
      // defaultValue=""
    />
  );
};

const Dropzone = ({
  multiple,
  onChange,
  additionalOnDropAccepted,
  ...rest
}) => {
  // eslint-disable-next-line no-unused-vars
  const { getValues, watch } = useFormContext();
  const _document = watch('document');
  const [validFiles, setValidFiles] = useState(
    !getValues('document') ? [] : [getValues('document')],
  );

  useEffect(() => {
    if (!_document) setValidFiles([]);
  }, [_document]);
  // if (!getValues('document')) setValidFiles([]);
  // const document = watch('document');
  // console.log('[FROM DROP]', document);

  // const inputRef = useRef();

  // comment this if we want memoized
  // useEffect(() => {
  //   if (!inputRef.current) setValidFiles([]);
  // }, [inputRef.current]);

  const onDropAccepted = useCallback(
    (files) => {
      setValidFiles(files);
      additionalOnDropAccepted(files);
    },
    [setValidFiles],
  );

  const _onChange = (e) => {
    onChange(e);
    setValidFiles(e.target.files);
  };

  const {
    acceptedFiles,
    inputRef,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    multiple,
    accept: {
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    onDropAccepted,
    ...rest,
  });

  console.log(
    'validFiles on render:',
    // validFiles,
    acceptedFiles,
    // inputRef.current,
    // getValues('document'),
    // _document,
  );

  // useEffect(() => {
  //   setValidFiles(acceptedFiles);
  // }, [acceptedFiles]);

  const files = validFiles.map((file) => (
    <div key={file.path} className="flex w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-between">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Tên
        </Typography>
        {file.path}
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="flex min-w-[250px] flex-col items-center justify-between">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Kích thước
        </Typography>
        {file.size} KB
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="flex min-w-[200px] flex-col items-center justify-between">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Số trang
        </Typography>
        24
      </div>
      <div className="flex h-full flex-col items-center justify-end">
        <CancelIcon
          className="cursor-pointer"
          onClick={() => {
            setValidFiles([]);
            // console.log('cancelling');
          }}
        />
      </div>
      {/* {file.path} - {file.size} */}
    </div>
  ));

  const rejectedFiles = fileRejections.map(({ errors }) => (
    <div key={errors[0].code} className="flex items-center gap-2 px-4 py-2">
      <InfoIcon />
      <Typography>
        Lỗi: Định dạng không phù hợp. Vui lòng thử lại với định dạng cho phép.
      </Typography>
    </div>
  ));

  const renderErrorMsg = () => {
    if (fileRejections.length > 1) {
      return (
        <div className="flex items-center gap-2 px-4 py-2">
          <InfoIcon />
          <Typography>
            Lỗi: Chỉ được tải lên tối đa 1 tài liệu. Vui lòng thử lại.
          </Typography>
        </div>
      );
    } else if (fileRejections.length === 1) {
      return (
        <div className="flex items-center gap-2 px-4 py-2">
          <InfoIcon />
          <Typography>
            Lỗi: Định dạng không phù hợp. Vui lòng thử lại với định dạng cho
            phép.
          </Typography>
        </div>
      );
    } else return null;
  };

  return (
    <div className="h-full w-full">
      {validFiles.length == 0 ? (
        <div className="flex h-full flex-col justify-between gap-4">
          <div
            {...getRootProps()}
            className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-primaryContainer"
          >
            <input {...getInputProps({ onChange: _onChange })} ref={inputRef} />
            <InsertDriveFileIcon sx={{ fontSize: 96, color: '#0461a3' }} />
            <Typography variant="title2">
              Kéo thả hoặc bấm vào ô này để thêm tài liệu cần in.
            </Typography>
            <Typography
              variant="title2"
              sx={{ fontWeight: 'bold', color: 'red' }}
            >
              Lưu ý: Sinh viên không được phép in ấn tài liệu với tên/nội dung
              chứa nội dung phản cảm/không phù hợp.
            </Typography>
          </div>
          {rejectedFiles.length > 0 && (
            <div className=" rounded-lg bg-red-100">{renderErrorMsg()}</div>
          )}
        </div>
      ) : (
        <div>{files}</div>
      )}
    </div>
  );
};

DropzoneField.propTypes = {
  name: PropTypes.string,
  multiple: PropTypes.bool,
};
Dropzone.propTypes = {
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  additionalOnDropAccepted: PropTypes.func,
};
