using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRDemo
{
	public class FileImportHub : Hub<IFileImportHubEvents>
	{
		FileImportService fileImportService = new FileImportService();

		public async Task ImportFiles(DateTime date, string[] files, ImportType importType)
		{
			await fileImportService.Import(date, files, importType);
			await Clients.All.NotifyImportCompletion(date, files, importType);
		}
	}
}