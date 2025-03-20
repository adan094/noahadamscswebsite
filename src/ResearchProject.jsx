
export default function ResearchProject()   
{
    return(
                <>
                    {/* Project explanation */}
                    <p>This project explores enhancing Market Basket Analysis (MBA) by integrating the K-Means clustering algorithm to address the inefficiency of traditional association rule mining with large datasets. MBA is a data mining technique that helps businesses understand customer purchase patterns by identifying correlations between frequently purchased items. However, association rule mining is computationally expensive and becomes impractical when dealing with vast amounts of transaction data.</p>
                    <p>To solve this, we propose a novel pre-processing step using K-Means clustering to segment data into meaningful clusters based on product revenue and the revenue of products purchased together. By filtering out clusters with lower relevance, we reduce the dataset size for the subsequent association rule mining process, improving computational efficiency. Our method focuses on products whose combined revenue is most significant, minimizing the input for mining without losing valuable information.</p>
                    <p>We compared our approach to traditional association rule mining across five input sizes using a test dataset. Our results show a significant reduction in processing time while maintaining or improving the quality of the insights generated. The approach not only speeds up the process but also enhances the value of the association rules, making it more efficient and practical for businesses with large-scale transaction data.</p>
                    <p>This method represents a step forward in scaling Market Basket Analysis, making it a more efficient tool for businesses to uncover valuable insights from large datasets. The integration of K-Means clustering offers a clear advantage in both performance and quality of the results, allowing for more effective decision-making based on transactional data.</p>
                </>
    )
}