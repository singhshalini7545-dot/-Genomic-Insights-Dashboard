import pandas as pd
import json

class GenomicProcessor:
    def __init__(self):
        self.trait_database = self.load_trait_database()
    
    def load_trait_database(self):
        # Educational database of SNPs and traits
        return {
            'rs1815739': {
                'gene': 'ACTN3',
                'trait': 'Athletic Performance',
                'genotype_effects': {
                    'CC': 'Enhanced endurance performance',
                    'CT': 'Mixed fiber type',
                    'TT': 'Enhanced power performance'
                },
                'category': 'Fitness',
                'significance': 'Moderate'
            },
            'rs7495174': {
                'gene': 'OCA2',
                'trait': 'Eye Color Probability',
                'genotype_effects': {
                    'AA': 'Higher probability of brown eyes',
                    'AG': 'Mixed probability',
                    'GG': 'Higher probability of blue/green eyes'
                },
                'category': 'Physical Traits',
                'significance': 'High'
            },
            'rs9939609': {
                'gene': 'FTO',
                'trait': 'Weight Management',
                'genotype_effects': {
                    'AA': 'Higher predisposition to obesity',
                    'AT': 'Moderate risk',
                    'TT': 'Lower risk of obesity'
                },
                'category': 'Metabolism',
                'significance': 'Moderate'
            },
            'rs12913832': {
                'gene': 'HERC2',
                'trait': 'Eye Color',
                'genotype_effects': {
                    'AA': 'High probability of brown eyes',
                    'AG': 'Mixed eye color',
                    'GG': 'High probability of blue eyes'
                },
                'category': 'Physical Traits',
                'significance': 'High'
            },
            'rs4680': {
                'gene': 'COMT',
                'trait': 'Stress Response',
                'genotype_effects': {
                    'AA': 'Better stress resilience',
                    'AG': 'Moderate stress response',
                    'GG': 'Higher anxiety predisposition'
                },
                'category': 'Neurology',
                'significance': 'Moderate'
            }
        }
    
    def process_23andme_file(self, filepath):
        """Process 23andMe format file"""
        results = {
            'traits': [],
            'health_risks': [],
            'summary': {}
        }
        
        try:
            # Skip comment lines and read data
            df = pd.read_csv(filepath, comment='#', sep='\t', 
                           names=['rsid', 'chromosome', 'position', 'genotype'])
            
            analyzed_snps = 0
            for _, row in df.iterrows():
                rsid = row['rsid']
                genotype = row['genotype']
                
                if rsid in self.trait_database:
                    snp_info = self.trait_database[rsid].copy()
                    snp_info['your_genotype'] = genotype
                    snp_info['interpretation'] = self.trait_database[rsid]['genotype_effects'].get(
                        genotype, 'Variant detected - interpretation not available'
                    )
                    
                    if snp_info['category'] in ['Metabolism', 'Neurology']:
                        results['health_risks'].append(snp_info)
                    else:
                        results['traits'].append(snp_info)
                    
                    analyzed_snps += 1
            
            results['summary'] = {
                'total_snps_analyzed': len(df),
                'traits_found': len(results['traits']),
                'health_risks_found': len(results['health_risks']),
                'matched_snps': analyzed_snps
            }
            
        except Exception as e:
            raise Exception(f"Error processing file: {str(e)}")
        
        return results
    
    def process_genomic_file(self, filepath):
        return self.process_23andme_file(filepath)

# Global instance
processor = GenomicProcessor()

def process_genomic_file(filepath):
    return processor.process_genomic_file(filepath)
