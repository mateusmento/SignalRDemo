using System;
using System.Threading.Tasks;

namespace SignalRDemo
{
	public interface IFileImportHubEvents
	{
		Task NotifyImportCompletion(DateTime date, string[] file, ImportType importType);
	}
}