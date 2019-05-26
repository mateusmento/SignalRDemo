using System;
using System.Threading.Tasks;

namespace SignalRDemo
{
	public interface IFileImporter
	{
		void Execute(string[] files);
		Task ExecuteAsync(string[] files);
	}
}