import { useState, useEffect } from 'react';
import { Modal, ErrorTypography } from '../common';
import { PaymentMethod, PaymentMethodOption } from '../../models/payment';
import { usePayment, usePaymentMethods } from '../../hooks';
import { SnackbarType } from '../../constants/snackbar';
import { useSnackbar } from '../../hooks';
import Button from '../common/Button';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  appointmentId: string;
  amount: number;
  onSuccess: () => void;
  onPaymentMethodSelect?: (method: PaymentMethod) => void;
  selectedPaymentMethod?: PaymentMethod | null;
}

const PaymentModal = ({
  open,
  onClose,
  appointmentId,
  amount,
  onSuccess,
  onPaymentMethodSelect,
  selectedPaymentMethod,
}: PaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    selectedPaymentMethod || null
  );
  const { sendRequest: processPayment, loading, errorMessage } = usePayment();
  const { sendRequest: fetchMethods, paymentMethods } = usePaymentMethods();
  const { snackbar } = useSnackbar();

  useEffect(() => {
    if (open) {
      fetchMethods();
    }
  }, [open, fetchMethods]);

  const handlePayment = async () => {
    if (!selectedMethod) {
      snackbar(
        'Please select a payment method',
        SnackbarType.ERROR,
        true,
        6000
      );
      return;
    }

    // If cash payment, call the payment method select callback
    if (selectedMethod === PaymentMethod.CASH && onPaymentMethodSelect) {
      onPaymentMethodSelect(selectedMethod);
      return;
    }

    // For online payments, process payment
    try {
      await processPayment({
        appointmentId,
        paymentMethod: selectedMethod,
        amount,
      });

      snackbar(
        'Payment processed successfully!',
        SnackbarType.SUCCESS,
        true,
        6000
      );
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
      // Error is handled by the hook
    }
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    if (onPaymentMethodSelect) {
      onPaymentMethodSelect(method);
    }
  };

  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.CASH:
        return '💵';
      case PaymentMethod.GCASH:
        return '📱';
      case PaymentMethod.PAYMAYA:
        return '💳';
      case PaymentMethod.CREDIT_CARD:
        return '💳';
      case PaymentMethod.DEBIT_CARD:
        return '🏦';
      default:
        return '💳';
    }
  };

  return (
    <Modal isOpen={open} onClose={onClose} title='Payment' size='lg'>
      <div className='space-y-6'>
        <div className='text-center'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Payment Amount
          </h3>
          <p className='text-3xl font-bold text-blue-600'>
            ₱{amount.toFixed(2)}
          </p>
        </div>

        {errorMessage && <ErrorTypography>{errorMessage}</ErrorTypography>}

        <div>
          <h4 className='text-md font-medium text-gray-900 mb-4'>
            Select Payment Method
          </h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {paymentMethods?.map((method: PaymentMethodOption) => (
              <button
                key={method.id}
                onClick={() => handleMethodSelect(method.id)}
                disabled={!method.enabled}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${
                  !method.enabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <div className='flex items-center space-x-3'>
                  <span className='text-2xl'>{getPaymentIcon(method.id)}</span>
                  <div>
                    <h5 className='font-medium text-gray-900'>{method.name}</h5>
                    <p className='text-sm text-gray-500'>
                      {method.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className='flex justify-end space-x-3'>
          <Button variant='secondary' onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant='primary'
            onClick={handlePayment}
            loading={loading}
            disabled={!selectedMethod}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
