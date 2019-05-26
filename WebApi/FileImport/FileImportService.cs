using System;
using System.Threading.Tasks;

namespace SignalRDemo
{
	public class FileImportService
	{
		FileImporterFactory fileImporterFactory = new FileImporterFactory();

		public async Task Import(DateTime date, string[] files, ImportType importType)
		{
			bool sameImportIsNotExecuting = await VerifyImportIsExecuting(date, importType);

			if (sameImportIsNotExecuting)
			{
				IFileImporter importer = fileImporterFactory.FromImportType(importType);
				await importer.ExecuteAsync(files);
			}
		}

		public Task<bool> VerifyImportIsExecuting(DateTime date, ImportType importType)
		{
			return Task.Run(() => true);
		}
	}
}