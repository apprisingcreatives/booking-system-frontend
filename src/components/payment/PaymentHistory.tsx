import { useEffect, useState, useRef } from 'react';
import { CircularLoading, ErrorTypography } from '../common';
import { Payment, PaymentStatus } from '../../models/payment';
import { useAllPayments } from '../../hooks';

const PaymentHistory = () => {
  const { sendRequest, loading, errorMessage, payments } = useAllPayments();
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>(
    'all'
  );
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      sendRequest();
      hasLoaded.current = true;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (payments) {
      if (statusFilter === 'all') {
        setFilteredPayments(payments);
      } else {
        setFilteredPayments(
          payments.filter((payment) => payment.status === statusFilter)
        );
      }
    }
  }, [payments, statusFilter]);

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.COMPLETED:
        return 'text-green-600 bg-green-100';
      case PaymentStatus.PENDING:
        return 'text-yellow-600 bg-yellow-100';
      case PaymentStatus.FAILED:
        return 'text-red-600 bg-red-100';
      case PaymentStatus.CANCELLED:
        return 'text-gray-600 bg-gray-100';
      case PaymentStatus.REFUNDED:
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash':
        return '💵';
      case 'gcash':
        return '📱';
      case 'paymaya':
        return '💳';
      case 'credit_card':
        return '💳';
      case 'debit_card':
        return '🏦';
      default:
        return '💳';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <CircularLoading size='lg' />
      </div>
    );
  }

  if (errorMessage) {
    return <ErrorTypography>{errorMessage}</ErrorTypography>;
  }

  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h2 className='text-3xl font-bold text-gray-900 mb-2'>
          Payment History
        </h2>
        <p className='text-gray-600'>
          View and track all your payment transactions
        </p>
      </div>

      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center space-x-2'>
          <span className='text-2xl'>💳</span>
          <span className='text-lg font-medium text-gray-700'>
            Filter by Status
          </span>
        </div>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as PaymentStatus | 'all')
          }
          className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm'
        >
          <option value='all'>All Payments</option>
          <option value={PaymentStatus.COMPLETED}>Completed</option>
          <option value={PaymentStatus.PENDING}>Pending</option>
          <option value={PaymentStatus.FAILED}>Failed</option>
          <option value={PaymentStatus.CANCELLED}>Cancelled</option>
          <option value={PaymentStatus.REFUNDED}>Refunded</option>
        </select>
      </div>

      {filteredPayments.length === 0 ? (
        <div className='text-center py-16'>
          <div className='w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6'>
            <span className='text-4xl'>💳</span>
          </div>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>
            No payments found
          </h3>
          <p className='text-gray-500 max-w-md mx-auto'>
            You don't have any payment transactions yet. Your payment history
            will appear here once you make your first payment.
          </p>
        </div>
      ) : (
        <div className='space-y-4'>
          {filteredPayments.map((payment) => (
            <div
              key={payment._id}
              className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.02]'
            >
              <div className='flex justify-between items-start'>
                <div className='flex items-center space-x-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                    <span className='text-white text-xl'>
                      {getPaymentMethodIcon(payment.paymentMethod)}
                    </span>
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 text-lg'>
                      {payment.paymentMethod.replace('_', ' ').toUpperCase()}
                    </h3>
                    <p className='text-sm text-gray-500 mt-1'>
                      Transaction ID: {payment.transactionId || 'N/A'}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {formatDate(payment.createdAt)}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-2xl font-bold text-gray-900 mb-2'>
                    ₱{payment.amount.toFixed(2)}
                  </p>
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      payment.status
                    )}`}
                  >
                    {payment.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
