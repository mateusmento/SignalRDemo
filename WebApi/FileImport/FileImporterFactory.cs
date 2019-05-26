using System;

namespace SignalRDemo
{
	public class FileImporterFactory
	{
		public IFileImporter FromImportType(ImportType importType)
		{
			switch (importType)
			{
				case ImportType.CUSTOMERS:
					return new CustomerImporter();
				case ImportType.PRODUCTS:
					return new ProductImporter();
				case ImportType.PRODUCT_SALES:
					return new ProductSaleImporter();
				case ImportType.CUSTOMER_PRODUCT_RECOMMENDATIONS:
					return new CustomerProductRecommendationImporter();
				default:
					throw new InvalidOperationException($"Invalid argument value of {importType}.");
			}
		}
	}
}