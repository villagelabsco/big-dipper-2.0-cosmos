import { useEffect } from 'react';
import { useRouter } from 'next/router';

function AccountDetailsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/accounts/${router.query.address}`);
  }, []);

  return null;
}

export default AccountDetailsPage;
