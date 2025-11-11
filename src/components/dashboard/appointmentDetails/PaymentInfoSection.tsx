import { PaymentMethod } from '../../../models';

type Props = {
  paymentAmount: number;
  paymentMethod: PaymentMethod;
};

const PaymentInfoSection = ({ paymentAmount, paymentMethod }: Props) => {
  return (
    <div>
      <h3 className='text-sm font-semibold text-gray-700 mb-2'>
        Payment Details
      </h3>
      <div className='bg-white border border-gray-200 rounded-lg p-4'>
        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>Amount:</span>
          <span className='text-xl font-bold text-gray-900'>
            ₱{paymentAmount.toLocaleString()}
          </span>
        </div>
        {paymentMethod && (
          <div className='flex justify-between items-center mt-2'>
            <span className='text-gray-600'>Method:</span>
            <span className='text-gray-900 capitalize'>{paymentMethod}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentInfoSection;
