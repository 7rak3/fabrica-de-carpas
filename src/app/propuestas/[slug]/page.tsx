import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProposal, PROPOSALS } from '@/data/proposals';
import ProposalViewer from '@/components/ProposalViewer';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(PROPOSALS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const proposal = getProposal(params.slug);

  if (!proposal) {
    return {
      title: 'Propuesta no encontrada | Fábrica de Carpas Chile',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${proposal.clientName} | Propuesta Técnica y Comercial | Fábrica de Carpas`,
    description: `Propuesta técnica confidencial para ${proposal.clientName}. Fabricación de carpas estructurales y domos iglú industriales.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function ProposalPage({ params }: Props) {
  const proposal = getProposal(params.slug);

  if (!proposal) {
    notFound();
  }

  return <ProposalViewer proposal={proposal} />;
}
