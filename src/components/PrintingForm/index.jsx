import { Alert, Box, MenuItem, Snackbar, Typography } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';

import { createTheme } from '@mui/material/styles';
import PillButton from './PillButton';
import { useEffect, useState } from 'react';

import './styles.css';
import FormContentContainer from './FormContentContainer';
import FormInput from '../FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DropzoneField } from './DropzoneField';
import PrintingSpecsLayout from './PrintingSpecsLayout';
import GridInputLayout from './GridInputLayout';
import { checkPagesScheme } from '../../utils/string';
import PrinterSelectionModal from './PrinterSelectionModal';
import ConfirmationView from './ConfirmationView';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0461a3',
    },
  },
});

const STEPS = 3;

const STEP_OFFSET = {
  1: 'left-0',
  2: 'left-[-100%]',
  3: 'left-[-200%]',
};

const PAGE_SIZES = ['A5', 'A4', 'A3'];
const PAGE_ORIENTATION = ['horizontal', 'vertical'];

const printingRequestSchema = z.object({
  paperSize: z.string().refine((val) => PAGE_SIZES.find((ps) => ps === val), {
    message: 'Không được để trống khổ in',
  }),
  oneSided: z.boolean({ required_error: 'Không được để trống kiểu in' }),
  orientation: z
    .string()
    .refine((val) => PAGE_ORIENTATION.find((ps) => ps === val), {
      message: 'Không được để trống chiều giấy',
    }),
  // printCount: z
  //   .number({
  //     required_error: 'Bản sao không được để trống',
  //     invalid_type_error: 'Bản sao phải là số nguyên dương',
  //   })
  //   .int()
  //   .positive(),
  printCount: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z
      .number({
        required_error: 'Bản sao không được để trống',
        invalid_type_error: 'Bản sao phải là số nguyên dương',
      })
      .int()
      .positive(),
  ),
  pages: z
    .string()
    .refine((val) => checkPagesScheme(val), { message: 'Cú pháp lỗi.' }),
  // .required()({ message: 'hi' }),
  // orientation: z.enum(['horizontal', 'vertical']).required(),
  // .nonempty('Không được để trống chiều in'),
  document: z.any(),
  canPurchase: z.boolean(),
});
// .refine(
//   (val) => {
//     const sizeScale =
//       val.paperSize === 'A5' ? 0.5 : val.paperSize === 'A3' ? 2 : 1;
//     const remaining = 100 - 24 * val.printCount * sizeScale;
//     console.log('[VALIDATING] ', remaining);
//     return remaining >= 0;
//   },
//   { message: 'Exceeding balance' },
// );

export default function PrintingForm() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const [selectedPrinter, setSelectedPrinter] = useState(null);

  const methods = useForm({
    resolver: zodResolver(printingRequestSchema),
    mode: 'onBlur',
    defaultValues: {
      paperSize: 'A4',
      oneSided: true,
      orientation: 'vertical',
      printCount: '1',
      canPurchase: true,
    },
  });

  const {
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  const document = watch('document');
  // const canPurchase = watch('canPurchase');

  useEffect(() => {
    if (isSubmitSuccessful) {
      setOpenSnackbar(true);
      reset();
      setSelectedPrinter(null);
      methods.setValue('document', null);
      setCurrentStep(1);
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler = (values) => {
    console.log('form:', values);
  };
  console.log('err:', errors);

  const formClasses = 'absolute flex w-[300%] justify-between h-full ';

  // useEffect(() => {
  //   console.log('[INFO] cur. step', currentStep);
  // }, [currentStep]);

  // useEffect(() => {
  //   console.log('[INFO] Watch Document state:', document);
  // }, [document]);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-full max-h-[832px] w-full flex-col justify-between overflow-hidden rounded-lg bg-white">
        <FormProvider {...methods}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler, () => {
              alert('');
            })}
            className="flex grow flex-col"
          >
            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={() => {
                setOpenSnackbar(false);
              }}
            >
              <Alert
                onClose={() => {
                  setOpenSnackbar(false);
                }}
                severity="success"
                sx={{ width: '100%' }}
              >
                Yêu cầu in tài liệu được gửi thành công!
              </Alert>
            </Snackbar>
            {/* CARD HEADER */}
            <div className="flex justify-between bg-customBlue px-6 py-3 text-white">
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Tải lên tệp
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Bước {currentStep} trên {STEPS}
              </Typography>
            </div>

            {/* CARD BODY */}
            <div className="relative m-4 h-full flex-1 overflow-hidden rounded-lg ">
              <div
                className={[formClasses, STEP_OFFSET[currentStep]].join(' ')}
              >
                {/* Part 1 */}
                <div className="flex h-full w-full justify-start ">
                  {/* Content 1
                  <PillButton
                    color="primary"
                    variant="outlined"
                    sx={{ boxShadow: 0 }}
                    onClick={() => {
                      setIsFileUploaded(!isFileUploaded);
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Thêm
                    </Typography>
                  </PillButton> */}
                  <DropzoneField
                    name="document"
                    multiple={false}
                    onChange={() => {
                      console.log('[INFO] Form state:', methods.formState);
                    }}
                  />
                </div>

                {/* Part 2 */}
                <FormContentContainer>
                  <PrintingSpecsLayout>
                    {/* Printer Selection */}
                    <PrinterSelectionModal
                      selectedPrinter={selectedPrinter}
                      setSelectedPrinter={setSelectedPrinter}
                    />

                    {/* Printing Specs */}
                    <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                      Thông số in
                    </Typography>

                    <div className="flex h-full flex-col justify-start py-2">
                      <GridInputLayout label={'Khổ in'}>
                        <FormInput
                          name="paperSize"
                          required
                          fullWidth
                          label="Khổ in"
                          select
                          size="small"
                          sx={{ mb: 2 }}
                        >
                          {[
                            { label: 'A5', value: 'A5' },
                            { label: 'A4', value: 'A4' },
                            { label: 'A3', value: 'A3' },
                          ].map(({ value, label }) => (
                            <MenuItem key={value} value={value}>
                              {label}
                            </MenuItem>
                          ))}
                        </FormInput>
                      </GridInputLayout>
                      <GridInputLayout label={'Kiểu in'}>
                        <FormInput
                          name="oneSided"
                          required
                          fullWidth
                          label="Kiểu in"
                          select
                          size="small"
                          sx={{ mb: 2 }}
                        >
                          {[
                            { label: 'Một mặt', value: true },
                            { label: 'Hai mặt', value: false },
                          ].map(({ value, label }) => (
                            <MenuItem key={value} value={value}>
                              {label}
                            </MenuItem>
                          ))}
                        </FormInput>
                      </GridInputLayout>
                      <GridInputLayout label={'Chiều giấy'}>
                        <FormInput
                          name="orientation"
                          required
                          fullWidth
                          label="Chiều giấy"
                          select
                          size="small"
                          sx={{ mb: 2 }}
                        >
                          {[
                            { label: 'Ngang', value: 'horizontal' },
                            { label: 'Dọc', value: 'vertical' },
                          ].map(({ value, label }) => (
                            <MenuItem key={value} value={value}>
                              {label}
                            </MenuItem>
                          ))}
                        </FormInput>
                      </GridInputLayout>
                      <GridInputLayout label={'Số bản sao'}>
                        <FormInput
                          name="printCount"
                          type="number"
                          required
                          fullWidth
                          label="Số bản sao"
                          // select
                          size="small"
                          sx={{ mb: 2 }}
                        />
                      </GridInputLayout>
                      <GridInputLayout label={'Trang in'}>
                        <FormInput
                          name="pages"
                          // required
                          fullWidth
                          // defaultValue={''}
                          label="Trang in"
                          // select
                          size="small"
                          sx={{ mb: 2 }}
                        />
                      </GridInputLayout>
                    </div>
                  </PrintingSpecsLayout>
                </FormContentContainer>
                {/* Part 3 */}
                <FormContentContainer>
                  <ConfirmationView
                    selectedPrinter={selectedPrinter}
                    document={document}
                  />
                  {/* <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Tệp
                  </Typography>
                  <Typography variant="body2">{document.path}</Typography>

                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Máy in
                  </Typography>
                  <GridDisplayLayout
                    data={[
                      { label: 'Tên', value: 'hehe' },
                      { label: 'Vị trí', value: 'hehe' },
                      { label: 'Khổ giấy tối đa', value: 'hehe' },
                    ]}
                  /> */}
                </FormContentContainer>
              </div>

              {/* </Box> */}
            </div>

            {/* CARD FOOTER */}
            <div className="flex justify-end gap-4 border-t-2 border-t-customBlue p-4">
              {currentStep > 1 && (
                <PillButton
                  color="primary"
                  variant="outlined"
                  sx={{ boxShadow: 0 }}
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Quay lại
                  </Typography>
                </PillButton>
              )}
              {currentStep !== 3 && (
                <PillButton
                  color="primary"
                  variant="contained"
                  sx={{ boxShadow: 0 }}
                  disabled={
                    (currentStep == 1 && !document) ||
                    (currentStep == 2 && !selectedPrinter) ||
                    Object.keys(methods.formState.errors).length > 0
                  }
                  onClick={() => {
                    console.log('[FROM STATE]', methods.formState.errors);
                    setCurrentStep(currentStep + 1);
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', color: 'white' }}
                  >
                    Tiếp tục
                  </Typography>
                </PillButton>
              )}
              {currentStep == 3 && (
                <PillButton
                  color="primary"
                  variant="contained"
                  sx={{ boxShadow: 0 }}
                  disabled={!methods.getValues('canPurchase')}
                  // disabled={!canPurchase}
                  type="submit"
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', color: 'white' }}
                  >
                    Gửi
                  </Typography>
                </PillButton>
              )}
            </div>
          </Box>
        </FormProvider>
      </div>
    </ThemeProvider>
  );
}
